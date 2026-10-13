import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  ChevronDownIcon,
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  UserIcon,
  WrenchIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useUserStore } from '@/stores/userStore';
import { useThemeStore } from '@/stores/themeStore';

/**
 * Topbar — Fixed top navigation bar with user menu, theme toggle, and currency selector
 */

export function Topbar() {
  const navigate = useNavigate();
  const { selectedCurrency, balance, formatAmount } = useCurrencyStore();
  const { user, isAuthenticated, logout } = useUserStore();
  const { theme, toggleTheme } = useThemeStore();
  
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  const userMenuItems = [
    { icon: UserCircleIcon, label: 'Edit Profile', action: () => navigate('/profile/edit') },
    { icon: UserIcon, label: 'Profile', action: () => navigate('/profile') },
    { icon: WrenchIcon, label: 'Accessibility Settings', action: () => navigate('/settings/accessibility') },
    { icon: Cog6ToothIcon, label: 'Account', action: () => navigate('/account') },
    { icon: ArrowRightOnRectangleIcon, label: 'Sign Out', action: handleLogout, divider: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left side */}
        <div className="flex-1"></div>

        {/* Right side - Search and utilities */}
        <div className="flex items-center gap-3">
          {/* Search button */}
          <button 
            className="flex items-center gap-2 px-3 py-2 rounded-button border border-border bg-canvas hover:bg-sand transition-colors duration-[var(--duration-fast)]"
            onClick={() => {
              const event = new KeyboardEvent('keydown', {
                key: 'k',
                ctrlKey: true,
                bubbles: true
              });
              window.dispatchEvent(event);
            }}
          >
            <MagnifyingGlassIcon className="w-4 h-4 text-muted" />
            <span className="text-sm text-muted">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium text-muted bg-sand rounded border border-border">
              <span>Ctrl</span>
              <span>K</span>
            </kbd>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-button hover:bg-sand transition-colors duration-[var(--duration-fast)]"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <MoonIcon className="w-5 h-5 text-muted" />
            ) : (
              <SunIcon className="w-5 h-5 text-muted" />
            )}
          </button>

          {/* Utility icons */}
          <div className="flex items-center gap-1">
            <button 
              className="p-2 rounded-button hover:bg-sand transition-colors duration-[var(--duration-fast)]"
              title="Notifications"
            >
              <BellIcon className="w-5 h-5 text-muted" />
            </button>
            
            <button 
              className="p-2 rounded-button hover:bg-sand transition-colors duration-[var(--duration-fast)]"
              title="Help"
            >
              <QuestionMarkCircleIcon className="w-5 h-5 text-muted" />
            </button>
          </div>

          {/* Upgrade button */}
          <button className="flex items-center gap-1.5 px-3 py-2 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors duration-[var(--duration-fast)]">
            <SparklesIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Upgrade</span>
          </button>

          {/* Currency selector and Balance */}
          <div className="relative">
            <button 
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-teal-tint rounded-button border border-teal/20 hover:bg-teal-tint/80 transition-colors"
            >
              <span className="text-sm font-medium text-teal">
                {formatAmount(balance)}
              </span>
              <ChevronDownIcon className="w-3 h-3 text-teal" />
            </button>

            {/* Currency dropdown */}
            {showCurrencyMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowCurrencyMenu(false)}
                />
                <CurrencyMenu onClose={() => setShowCurrencyMenu(false)} />
              </>
            )}
          </div>

          {/* User profile menu */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-button hover:bg-sand transition-colors duration-[var(--duration-fast)]"
            >
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center text-sm font-medium">
                  {user?.name?.[0]?.toUpperCase() || 'U'}
                </div>
              )}
              <ChevronDownIcon className="w-4 h-4 text-muted" />
            </button>

            {/* User menu dropdown */}
            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-card shadow-lg py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      <div className="px-3 py-2 border-b border-border">
                        <p className="text-sm font-medium text-charcoal">{user?.name}</p>
                        <p className="text-xs text-muted">{user?.email}</p>
                      </div>
                      {userMenuItems.map((item, index) => (
                        <div key={index}>
                          {item.divider && <div className="my-1 border-t border-border" />}
                          <button
                            onClick={() => {
                              item.action();
                              setShowUserMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-charcoal hover:bg-sand transition-colors"
                          >
                            <item.icon className="w-4 h-4 text-muted" />
                            <span>{item.label}</span>
                          </button>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate('/login');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-charcoal hover:bg-sand"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => {
                          navigate('/signup');
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-charcoal hover:bg-sand"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function CurrencyMenu({ onClose }: { onClose: () => void }) {
  const { selectedCurrency, setSelectedCurrency } = useCurrencyStore();
  const currencies = useCurrencyStore((state) => state);

  const currencyList = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
    { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
    { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
    { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
    { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-surface border border-border rounded-card shadow-lg py-2 z-50">
      <div className="px-3 py-2 text-xs font-semibold text-muted border-b border-border">
        Select Currency
      </div>
      {currencyList.map((currency) => (
        <button
          key={currency.code}
          onClick={() => {
            setSelectedCurrency(currency);
            onClose();
          }}
          className={`w-full text-left px-3 py-2 text-sm hover:bg-sand transition-colors flex items-center justify-between ${
            selectedCurrency.code === currency.code ? 'bg-orange-tint text-orange' : 'text-charcoal'
          }`}
        >
          <span>{currency.label}</span>
          <span className="font-medium">{currency.symbol}</span>
        </button>
      ))}
    </div>
  );
}
