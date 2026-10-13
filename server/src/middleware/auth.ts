import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

/**
 * Auth middleware — JWT-based authentication via httpOnly cookies.
 *
 * Three levels of protection:
 *   authenticate  → attach user to request if token is valid (no error if missing)
 *   requireAuth   → 401 if no valid token
 *   requirePro    → 403 if user's plan is not 'pro'
 */

// ─── Types ───

export interface JwtPayload {
  id: string;
  email: string;
  plan: 'free' | 'pro';
}

// Extend Express Request so downstream handlers can read req.user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// ─── Helpers ───

function verifyAccessToken(token: string): JwtPayload | null {
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
    return payload;
  } catch {
    return null;
  }
}

// ─── Middleware ───

/** Attach req.user if the access-token cookie is valid. Never rejects. */
export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const token = req.cookies?.gentech_access;
  if (token) {
    const payload = verifyAccessToken(token);
    if (payload) req.user = payload;
  }
  next();
}

/** 401 if no valid access token. */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
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
export function requirePro(req: Request, res: Response, next: NextFunction) {
  if (req.user?.plan !== 'pro') {
    res.status(403).json({ error: 'Pro plan required' });
    return;
  }
  next();
}
