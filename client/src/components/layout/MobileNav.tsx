import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Users, TrendingUp, Menu, Briefcase } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useState } from 'react';

/**
 * MobileNav — bottom tab bar for screens under 768px.
 *
 * Shows the 4 most important nav items plus a "More" sheet.
 * On mobile the sidebar is hidden entirely.
 */

const primaryNavItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/workspace', label: 'Workspace', icon: LayoutGrid },
  { to: '/find-work', label: 'Find Work', icon: Briefcase },
  { to: '/clients', label: 'Clients', icon: Users },
];

export function MobileNav() {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center gap-1 px-3 py-1.5 rounded-button min-w-[4rem]',
                  'transition-colors duration-[var(--duration-fast)]',
                  isActive
                    ? 'text-orange'
                    : 'text-muted active:text-charcoal',
                )
              }
            >
              <item.icon size={20} />
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
          <button
            onClick={() => setShowMore((p) => !p)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-button min-w-[4rem]',
              'text-muted active:text-charcoal transition-colors',
              showMore && 'text-orange',
            )}
          >
            <Menu size={20} />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </nav>

      {/* More sheet overlay */}
      {showMore && (
        <div
          className="md:hidden fixed inset-0 bg-charcoal/40 z-40 animate-fade-in"
          onClick={() => setShowMore(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-xl p-4 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
            <div className="space-y-1 pb-safe-bottom">
              <NavLink
                to="/growth"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-button text-charcoal hover:bg-sand"
              >
                Growth
              </NavLink>
              <NavLink
                to="/tools"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-button text-charcoal hover:bg-sand"
              >
                Tools
              </NavLink>
              <NavLink
                to="/ai"
                onClick={() => setShowMore(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-button text-charcoal hover:bg-sand"
              >
                AI
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
