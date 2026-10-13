import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { User } from '@/lib/api';
import { fetchMe, refreshToken, logout as apiLogout } from '@/lib/api';

/**
 * Auth context — provides user state to the entire app.
 *
 * On mount it tries to fetch the current user from /api/auth/me.
 * If the access token is expired it silently refreshes via /api/auth/refresh.
 * Components use the useAuth() hook to read user state or trigger sign-out.
 */

interface AuthContextValue {
  /** The current user, or null if not signed in. */
  user: User | null;
  /** True while the initial auth check is in progress. */
  loading: boolean;
  /** Sign out and clear local state. */
  signOut: () => Promise<void>;
  /** Re-fetch the user (e.g. after a profile update). */
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    try {
      // Try fetching the current user
      let me = await fetchMe();

      if (!me) {
        // Access token may be expired — try a silent refresh
        const refreshed = await refreshToken();
        if (refreshed) {
          me = await fetchMe();
        }
      }

      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // Silent refresh every 13 minutes (access token lasts 15)
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(async () => {
      const ok = await refreshToken();
      if (!ok) {
        setUser(null);
      }
    }, 13 * 60 * 1000);

    return () => clearInterval(interval);
  }, [user]);

  const signOut = useCallback(async () => {
    await apiLogout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signOut, refetch: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

/** Access the auth context. Must be used inside <AuthProvider>. */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
