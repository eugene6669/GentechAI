import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * ProtectedRoute — wraps content that requires authentication.
 *
 * Shows a loading spinner while checking auth, then either renders
 * children or redirects to the sign-in page.
 */

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** If true, requires Pro plan in addition to authentication. */
  requirePro?: boolean;
}

export function ProtectedRoute({ children, requirePro }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Still checking — show a loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-muted">Checking authentication...</div>
      </div>
    );
  }

  // Not signed in — redirect to sign-in
  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  // Requires Pro but user is on Free
  if (requirePro && user.plan !== 'pro') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-2xl font-heading font-bold text-charcoal mb-2">
          Pro Feature
        </h1>
        <p className="text-muted mb-6">
          This feature is available on the Pro plan.
        </p>
        <a
          href="/profile"
          className="px-4 py-2 bg-orange text-white rounded-button font-medium hover:bg-[#E64800]"
        >
          View Plans
        </a>
      </div>
    );
  }

  return <>{children}</>;
}
