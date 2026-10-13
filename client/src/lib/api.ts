/**
 * Auth API client — thin wrappers around the backend auth endpoints.
 *
 * All requests include credentials (cookies) so the httpOnly tokens
 * are sent automatically.
 */

const API = '/api';

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  plan: 'free' | 'pro';
  created_at: string;
  role_tags: string[];
  bio: string | null;
  timezone: string;
}

/** Fetch the current user's profile. Returns null if not authenticated. */
export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API}/auth/me`, { credentials: 'include' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user;
}

/** Refresh the access token using the refresh cookie. */
export async function refreshToken(): Promise<boolean> {
  const res = await fetch(`${API}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.ok;
}

/** Log out — clears cookies on the server. */
export async function logout(): Promise<void> {
  await fetch(`${API}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

/** Update profile fields. */
export async function updateProfile(
  data: Partial<{ role_tags: string[]; bio: string; timezone: string }>,
) {
  const res = await fetch(`${API}/user/profile`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update profile');
  return res.json();
}

/** Update plan (placeholder for Phase 14 payments). */
export async function updatePlan(plan: 'free' | 'pro') {
  const res = await fetch(`${API}/user/plan`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ plan }),
  });
  if (!res.ok) throw new Error('Failed to update plan');
  return res.json();
}

/** Get the Google OAuth sign-in URL. */
export function getGoogleSignInUrl() {
  return `${API}/auth/google`;
}
