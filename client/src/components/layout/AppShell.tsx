import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { Topbar } from './Topbar';

/**
 * AppShell — wraps the entire app with sidebar + main content area.
 *
 * The sidebar is hidden on mobile; MobileNav (bottom tabs) replaces it.
 * Topbar appears at the top of every module with search, utilities, and profile.
 */

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto bg-canvas pb-16 md:pb-0">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
