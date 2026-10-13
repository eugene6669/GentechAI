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
declare const router: import("express-serve-static-core").Router;
export default router;
//# sourceMappingURL=auth.d.ts.map