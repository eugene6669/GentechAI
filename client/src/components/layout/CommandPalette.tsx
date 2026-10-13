import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { toolRegistry } from '@/tools/registry';

/**
 * CommandPalette — quick launcher for tools and pages.
 *
 * Triggered by Ctrl/Cmd+K (handled in App.tsx).
 * Fuzzy-searches all tools by name and navigates on Enter.
 */

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tools by query
  const filtered = toolRegistry.filter((tool) =>
    tool.name.toLowerCase().includes(query.toLowerCase()),
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery('');
    }
  }, [open]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        navigate(filtered[selectedIndex].route);
        onClose();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-charcoal/40 z-50 flex items-start justify-center pt-[20vh] animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-card border border-border shadow-lg w-full max-w-xl mx-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search size={18} className="text-muted" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-charcoal placeholder:text-muted"
          />
          <button
            onClick={onClose}
            className="text-muted hover:text-charcoal transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted text-sm">
              No tools found
            </div>
          ) : (
            <div className="py-2">
              {filtered.map((tool, idx) => (
                <button
                  key={tool.id}
                  onClick={() => {
                    navigate(tool.route);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    'w-full flex items-start gap-3 px-4 py-3 text-left transition-colors',
                    idx === selectedIndex
                      ? 'bg-sand'
                      : 'hover:bg-sand/50',
                  )}
                >
                  <div className="text-orange-accessible mt-0.5">
                    <tool.icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-charcoal">
                      {tool.name}
                    </div>
                    <div className="text-xs text-muted truncate">
                      {tool.description}
                    </div>
                  </div>
                  <div className="text-xs text-muted shrink-0">
                    {tool.category}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2 border-t border-border text-xs text-muted flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-sand rounded text-charcoal">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-sand rounded text-charcoal">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-sand rounded text-charcoal">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-sand rounded text-charcoal">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
