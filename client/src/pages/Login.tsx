import {
  UserCircleIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';

/**
 * Login Page - Google OAuth authentication
 */

export default function Login() {
  const handleGoogleLogin = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:4000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-orange flex items-center justify-center">
            <span className="text-white font-heading font-bold text-2xl">G</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
            Welcome Back
          </h1>
          <p className="text-muted">
            Sign in to your Gentech AI Tools account
          </p>
        </div>

        <div className="bg-surface rounded-card border border-border p-8 space-y-6">
          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-border rounded-button hover:bg-sand transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-charcoal">Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-muted">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-orange"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-border rounded-button focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-muted">Remember me</span>
              </label>
              <a href="/forgot-password" className="text-orange hover:text-[#E64800]">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors font-medium"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted">
            Don't have an account?{' '}
            <a href="/signup" className="text-orange hover:text-[#E64800] font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
