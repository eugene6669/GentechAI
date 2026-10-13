import jwt from 'jsonwebtoken';
import { config } from '../config.js';
// ─── Helpers ───
function verifyAccessToken(token) {
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        return payload;
    }
    catch {
        return null;
    }
}
// ─── Middleware ───
/** Attach req.user if the access-token cookie is valid. Never rejects. */
export function authenticate(req, _res, next) {
    const token = req.cookies?.gentech_access;
    if (token) {
        const payload = verifyAccessToken(token);
        if (payload)
            req.user = payload;
    }
    next();
}
/** 401 if no valid access token. */
export function requireAuth(req, res, next) {
    const token = req.cookies?.gentech_access;
    if (!token) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    const payload = verifyAccessToken(token);
    if (!payload) {
        res.status(401).json({ error: 'Invalid or expired token' });
        return;
    }
    req.user = payload;
    next();
}
/** 403 if user is not on the Pro plan. Must be used after requireAuth. */
export function requirePro(req, res, next) {
    if (req.user?.plan !== 'pro') {
        res.status(403).json({ error: 'Pro plan required' });
        return;
    }
    next();
}
//# sourceMappingURL=auth.js.map