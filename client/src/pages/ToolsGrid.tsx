import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui';
import { toolRegistry, categories, type ToolCategory } from '@/tools/registry';
import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * ToolsGrid — searchable, filterable grid of all tools.
 *
 * Shows category chips at the top, a search bar, and a clean grid.
 * Each tool card has only an icon, name, and one-line description.
 */

export default function ToolsGrid() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');

  // Filter tools
  const filtered = toolRegistry.filter((tool) => {
    const matchesQuery = tool.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-2">
          Tools
        </h1>
        <p className="text-base md:text-lg text-muted">
          {toolRegistry.length} free browser-based tools
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-button text-sm text-charcoal placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <CategoryChip
          label="All"
          active={selectedCategory === 'All'}
          onClick={() => setSelectedCategory('All')}
        />
        {categories.map((cat) => (
          <CategoryChip
            key={cat}
            label={cat}
            active={selectedCategory === cat}
            onClick={() => setSelectedCategory(cat)}
          />
        ))}
      </div>

      {/* Tools grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted">No tools found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((tool) => (
            <Link key={tool.id} to={tool.route}>
              <Card hoverable>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-button bg-orange-tint flex items-center justify-center shrink-0">
                    <tool.icon className="text-orange-accessible" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-base text-charcoal mb-1">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-button text-sm font-medium transition-colors',
        active
          ? 'bg-orange text-white'
          : 'bg-surface border border-border text-charcoal hover:bg-sand',
      )}
    >
      {label}
    </button>
  );
}
