import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { authenticate } from './middleware/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

/**
 * Gentech AI Tools — Backend Server
 *
 * Phase 1: Health check only.
 * Phase 2: Google OAuth, JWT sessions, user profiles, entitlements.
 */

const app = express();

// ─── Global middleware ───
app.use(cors({
  origin: config.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(authenticate); // Attach req.user on every request if cookie is present

// ─── Routes ───
app.get('/', (_req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Gentech AI Tools API',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      user: '/api/user'
    }
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Gentech AI Tools API' });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// ─── Error handler ───
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ───
app.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});
