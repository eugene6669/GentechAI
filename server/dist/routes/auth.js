import { Router } from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { query } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';
/**
 * Auth routes — Google OAuth 2.0, JWT tokens, session management.
 *
 * Flow:
 *   1. Frontend redirects to GET /api/auth/google
 *   2. Google consent → callback at GET /api/auth/google/callback
 *   3. Server upserts user, creates session, sets httpOnly cookies
 *   4. Redirect back to the frontend
 *
 * Tokens:
 *   - Access token:  JWT in `gentech_access` cookie, 15-minute expiry
 *   - Refresh token: Random string in `gentech_refresh` cookie, 30-day expiry
 */
const router = Router();
// ─── Cookie helpers ───
const COOKIE_OPTS_BASE = {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
};
const ACCESS_MAX_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days
function generateAccessToken(payload) {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: '15m' });
}
function generateRefreshToken() {
    return crypto.randomBytes(48).toString('base64url');
}
function setAuthCookies(res, accessToken, refreshToken) {
    res.cookie('gentech_access', accessToken, {
        ...COOKIE_OPTS_BASE,
        maxAge: ACCESS_MAX_AGE,
    });
    res.cookie('gentech_refresh', refreshToken, {
        ...COOKIE_OPTS_BASE,
        maxAge: REFRESH_MAX_AGE,
    });
}
function clearAuthCookies(res) {
    res.clearCookie('gentech_access', COOKIE_OPTS_BASE);
    res.clearCookie('gentech_refresh', COOKIE_OPTS_BASE);
}
// ─── Google OAuth URLs ───
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';
// ─── Routes ───
/**
 * GET /api/auth/google
 * Redirect the user to Google's consent screen.
 */
router.get('/google', (_req, res) => {
    const params = new URLSearchParams({
        client_id: config.GOOGLE_CLIENT_ID,
        redirect_uri: `${config.CLIENT_URL.replace(/\/$/, '')}/api/auth/google/callback`,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
    });
    // In dev the Vite proxy forwards /api/* to Express, so the redirect_uri
    // points at the frontend origin. In production it should point at the API.
    if (config.NODE_ENV === 'production') {
        params.set('redirect_uri', `${config.CLIENT_URL}/api/auth/google/callback`);
    }
    res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
});
/**
 * GET /api/auth/google/callback
 * Google sends the user here after consent. Exchange code → tokens → user info.
 */
router.get('/google/callback', async (req, res) => {
    try {
        const { code } = req.query;
        if (!code || typeof code !== 'string') {
            res.status(400).json({ error: 'Missing authorization code' });
            return;
        }
        // 1. Exchange authorization code for tokens
        const tokenRes = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: config.GOOGLE_CLIENT_ID,
                client_secret: config.GOOGLE_CLIENT_SECRET,
                redirect_uri: `${config.CLIENT_URL.replace(/\/$/, '')}/api/auth/google/callback`,
                grant_type: 'authorization_code',
            }),
        });
        if (!tokenRes.ok) {
            console.error('Google token exchange failed:', await tokenRes.text());
            res.status(502).json({ error: 'Failed to authenticate with Google' });
            return;
        }
        const tokenData = (await tokenRes.json());
        // 2. Fetch user profile from Google
        const profileRes = await fetch(GOOGLE_USERINFO_URL, {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        });
        if (!profileRes.ok) {
            console.error('Google profile fetch failed:', await profileRes.text());
            res.status(502).json({ error: 'Failed to fetch Google profile' });
            return;
        }
        const profile = (await profileRes.json());
        // 3. Upsert user
        const upsertResult = await query(`INSERT INTO users (email, name, avatar_url, google_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (google_id)
       DO UPDATE SET name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url
       RETURNING id, email, plan`, [profile.email, profile.name, profile.picture, profile.id]);
        const user = upsertResult.rows[0];
        // 4. Create profile row if it doesn't exist yet
        await query(`INSERT INTO profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [user.id]);
        // 5. Create session with refresh token
        const refreshToken = generateRefreshToken();
        const expiresAt = new Date(Date.now() + REFRESH_MAX_AGE);
        await query(`INSERT INTO sessions (user_id, refresh_token, user_agent, ip_address, expires_at)
       VALUES ($1, $2, $3, $4, $5)`, [user.id, refreshToken, req.headers['user-agent'] ?? null, req.ip, expiresAt]);
        // 6. Generate JWT access token
        const accessToken = generateAccessToken({
            id: user.id,
            email: user.email,
            plan: user.plan,
        });
        // 7. Set cookies and redirect to frontend
        setAuthCookies(res, accessToken, refreshToken);
        res.redirect(config.CLIENT_URL);
    }
    catch (err) {
        console.error('OAuth callback error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/auth/refresh
 * Rotate the refresh token and issue a new access token.
 */
router.post('/refresh', async (req, res) => {
    try {
        const oldRefresh = req.cookies?.gentech_refresh;
        if (!oldRefresh) {
            res.status(401).json({ error: 'No refresh token' });
            return;
        }
        // Look up the session
        const sessionResult = await query(`SELECT s.id, s.user_id, s.expires_at,
              u.email, u.plan
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.refresh_token = $1`, [oldRefresh]);
        if (sessionResult.rows.length === 0) {
            clearAuthCookies(res);
            res.status(401).json({ error: 'Invalid refresh token' });
            return;
        }
        const session = sessionResult.rows[0];
        // Check expiry
        if (new Date(session.expires_at) < new Date()) {
            await query(`DELETE FROM sessions WHERE id = $1`, [session.id]);
            clearAuthCookies(res);
            res.status(401).json({ error: 'Refresh token expired' });
            return;
        }
        // Rotate: issue new refresh token, update session
        const newRefresh = generateRefreshToken();
        const newExpiry = new Date(Date.now() + REFRESH_MAX_AGE);
        await query(`UPDATE sessions SET refresh_token = $1, expires_at = $2 WHERE id = $3`, [newRefresh, newExpiry, session.id]);
        // Issue new access token
        const accessToken = generateAccessToken({
            id: session.user_id,
            email: session.email,
            plan: session.plan,
        });
        setAuthCookies(res, accessToken, newRefresh);
        res.json({ ok: true });
    }
    catch (err) {
        console.error('Token refresh error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * POST /api/auth/logout
 * Delete the session and clear cookies.
 */
router.post('/logout', async (req, res) => {
    try {
        const refreshToken = req.cookies?.gentech_refresh;
        if (refreshToken) {
            await query(`DELETE FROM sessions WHERE refresh_token = $1`, [refreshToken]);
        }
        clearAuthCookies(res);
        res.json({ ok: true });
    }
    catch (err) {
        console.error('Logout error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
/**
 * GET /api/auth/me
 * Return the current user's profile. Requires authentication.
 */
router.get('/me', requireAuth, async (req, res) => {
    try {
        const result = await query(`SELECT u.id, u.email, u.name, u.avatar_url, u.plan, u.created_at,
              p.role_tags, p.bio, p.timezone
       FROM users u
       LEFT JOIN profiles p ON p.user_id = u.id
       WHERE u.id = $1`, [req.user.id]);
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({ user: result.rows[0] });
    }
    catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
export default router;
//# sourceMappingURL=auth.js.map