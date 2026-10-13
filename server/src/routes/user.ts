import { Router } from 'express';
import { z } from 'zod';
import { query } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

/**
 * User routes — profile updates and plan management.
 *
 * All routes here require authentication. Plan changes are a placeholder;
 * real payment integration comes in Phase 14.
 */

const router = Router();

// ─── Validation schemas ───

const profileUpdateSchema = z.object({
  role_tags: z
    .array(z.string().max(32))
    .max(10)
    .optional(),
  bio: z
    .string()
    .max(500)
    .optional(),
  timezone: z
    .string()
    .max(64)
    .optional(),
});

const planUpdateSchema = z.object({
  plan: z.enum(['free', 'pro']),
});

// ─── Routes ───

/**
 * PATCH /api/user/profile
 * Update profile fields (role_tags, bio, timezone).
 */
router.patch('/profile', requireAuth, async (req, res) => {
  try {
    const parsed = profileUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
      return;
    }

    const { role_tags, bio, timezone } = parsed.data;
    const userId = req.user!.id;

    // Build dynamic SET clause — only update provided fields
    const updates: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (role_tags !== undefined) {
      updates.push(`role_tags = $${idx++}`);
      values.push(role_tags);
    }
    if (bio !== undefined) {
      updates.push(`bio = $${idx++}`);
      values.push(bio);
    }
    if (timezone !== undefined) {
      updates.push(`timezone = $${idx++}`);
      values.push(timezone);
    }

    if (updates.length === 0) {
      res.status(400).json({ error: 'No fields to update' });
      return;
    }

    values.push(userId);

    const result = await query(
      `UPDATE profiles SET ${updates.join(', ')} WHERE user_id = $${idx} RETURNING *`,
      values,
    );

    if (result.rows.length === 0) {
      // Profile row doesn't exist yet — create it
      await query(
        `INSERT INTO profiles (user_id, role_tags, bio, timezone)
         VALUES ($1, $2, $3, $4)`,
        [userId, role_tags ?? [], bio ?? null, timezone ?? 'Asia/Manila'],
      );
      const newProfile = await query(`SELECT * FROM profiles WHERE user_id = $1`, [userId]);
      res.json({ profile: newProfile.rows[0] });
      return;
    }

    res.json({ profile: result.rows[0] });
  } catch (err) {
    console.error('Profile update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * PATCH /api/user/plan
 * Update the user's plan. Placeholder for Phase 14 payment integration.
 */
router.patch('/plan', requireAuth, async (req, res) => {
  try {
    const parsed = planUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Invalid input', details: parsed.error.flatten() });
      return;
    }

    const result = await query(
      `UPDATE users SET plan = $1 WHERE id = $2 RETURNING id, email, plan`,
      [parsed.data.plan, req.user!.id],
    );

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error('Plan update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
