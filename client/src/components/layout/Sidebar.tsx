import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutGrid,
  Users,
  TrendingUp,
  Wrench,
  Sparkles,
  Briefcase,
  Zap,
  Puzzle,
  BookOpen,
  GraduationCap,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useSidebarStore } from '@/stores/sidebarStore';

/**
 * Sidebar — Main navigation with expandable submenus
 */

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  submenu?: { to: string; label: string }[];
}

const navItems: NavItem[] = [
  { to: '/', label: 'Home', icon: Home },
  { 
    to: '/workspace', 
    label: 'Workspace', 
    icon: LayoutGrid,
    submenu: [
      { to: '/workspace?tab=task-board', label: 'Task Board' },
      { to: '/workspace?tab=task-tracker', label: 'Task Time Tracker' },
      { to: '/workspace?tab=sheet', label: 'Sheet' },
      { to: '/workspace?tab=calendar', label: 'Calendar' },
      { to: '/workspace?tab=files', label: 'My Files' },
      { to: '/workspace?tab=links', label: 'Links' },
      { to: '/workspace?tab=snippets', label: 'Snippets' },
      { to: '/workspace?tab=clients', label: 'Clients' },
      { to: '/workspace?tab=invoices', label: 'Invoices' },
    ]
  },
  { 
    to: '/find-work', 
    label: 'Find Work', 
    icon: Briefcase,
    submenu: [
      { to: '/find-work?tab=onlinejobs', label: 'OnlineJobs.ph' },
      { to: '/find-work?tab=linkedin', label: 'LinkedIn Jobs' },
      { to: '/find-work?tab=jobstreet', label: 'Jobstreet PH' },
      { to: '/find-work?tab=va-agencies', label: 'VA Agencies' },
      { to: '/find-work?tab=maps-leads', label: 'Google Maps Leads' },
      { to: '/find-work?tab=application-tracker', label: 'Application Tracker' },
    ]
  },
  { to: '/clients', label: 'Clients', icon: Users },
  { to: '/growth', label: 'Growth', icon: TrendingUp },
  { to: '/tools', label: 'Tools', icon: Wrench },
  { to: '/ai', label: 'AI', icon: Sparkles },
  { to: '/ghl-tools', label: 'GHL Tools', icon: Zap },
  { to: '/extensions', label: 'Extensions', icon: Puzzle },
  { to: '/guides', label: 'Guides', icon: BookOpen },
  { to: '/courses', label: 'Courses', icon: GraduationCap },
  { to: '/learn', label: 'Learn', icon: Lightbulb },
];

export function Sidebar() {
  const collapsed = useSidebarStore((s) => s.collapsed);
  const toggle = useSidebarStore((s) => s.toggle);
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (itemTo: string) => {
    setExpandedItems(prev => 
      prev.includes(itemTo) 
        ? prev.filter(item => item !== itemTo)
        : [...prev, itemTo]
    );
  };

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-surface border-r border-border relative z-50',
        'transition-[width] duration-[var(--duration-normal)]',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-orange flex items-center justify-center">
          <span className="text-white font-heading font-bold text-sm">G</span>
        </div>
        {!collapsed && (
          <span className="font-heading font-bold text-base whitespace-nowrap">
            Gentech AI
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const hasSubmenu = item.submenu && item.submenu.length > 0;
          const isExpanded = expandedItems.includes(item.to);

          return (
            <div key={item.to}>
              {/* Main nav item */}
              <div className="flex items-center gap-0">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-button text-sm font-medium flex-1',
                      'transition-colors duration-[var(--duration-fast)]',
                      isActive
                        ? 'bg-orange-tint text-orange-accessible dark:bg-orange/15 dark:text-orange'
                        : 'text-muted hover:bg-sand hover:text-charcoal',
                      collapsed && 'justify-center px-0',
                    )
                  }
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && <span className="flex-1">{item.label}</span>}
                </NavLink>
                
                {/* Submenu toggle button */}
                {hasSubmenu && !collapsed && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSubmenu(item.to);
                    }}
                    className={cn(
                      'p-2 rounded-button transition-colors',
                      isActive ? 'text-orange' : 'text-muted hover:bg-sand hover:text-charcoal'
                    )}
                  >
                    {isExpanded ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {/* Submenu */}
              {hasSubmenu && !collapsed && isExpanded && (
                <div className="ml-11 mt-1 space-y-1">
                  {item.submenu!.map((subItem) => (
                    <NavLink
                      key={subItem.to}
                      to={subItem.to}
                      className={({ isActive }) =>
                        cn(
                          'block px-3 py-2 rounded-button text-sm transition-colors',
                          isActive
                            ? 'bg-orange-tint/50 text-orange font-medium'
                            : 'text-muted hover:bg-sand hover:text-charcoal'
                        )
                      }
                    >
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom controls - Collapse toggle only */}
      <div className="border-t border-border p-2 shrink-0">
        <button
          onClick={toggle}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-button text-sm',
            'text-muted hover:bg-sand hover:text-charcoal transition-colors',
            collapsed && 'justify-center px-0',
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
