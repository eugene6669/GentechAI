import { Request, Response, NextFunction } from 'express';
/**
 * Auth middleware — JWT-based authentication via httpOnly cookies.
 *
 * Three levels of protection:
 *   authenticate  → attach user to request if token is valid (no error if missing)
 *   requireAuth   → 401 if no valid token
 *   requirePro    → 403 if user's plan is not 'pro'
 */
export interface JwtPayload {
    id: string;
    email: string;
    plan: 'free' | 'pro';
}
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
/** Attach req.user if the access-token cookie is valid. Never rejects. */
export declare function authenticate(req: Request, _res: Response, next: NextFunction): void;
/** 401 if no valid access token. */
export declare function requireAuth(req: Request, res: Response, next: NextFunction): void;
/** 403 if user is not on the Pro plan. Must be used after requireAuth. */
export declare function requirePro(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map