import { Card } from '@/components/ui';
import { Clock, Wrench, FileText, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Home — a calm dashboard with just 4 cards.
 *
 * The brief says: "at most 4 cards: Today's tasks, Recent tools,
 * Unpaid invoices, and Quick start. No walls of widgets."
 *
 * For Phase 1 these are placeholder cards; they'll be wired up in later phases.
 */

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-charcoal mb-2">
          Welcome back
        </h1>
        <p className="text-base md:text-lg text-muted">
          Your workspace is ready. What would you like to do today?
        </p>
      </div>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Today's tasks */}
        <Card hoverable>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-button bg-orange-tint flex items-center justify-center">
              <Clock className="text-orange-accessible" size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-lg text-charcoal">
                Today's Tasks
              </h2>
              <p className="text-sm text-muted">No tasks due today</p>
            </div>
          </div>
          <Link
            to="/workspace"
            className="text-sm text-teal hover:text-teal/80 font-medium"
          >
            Go to Workspace →
          </Link>
        </Card>

        {/* Recent tools */}
        <Card hoverable>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-button bg-teal-tint flex items-center justify-center">
              <Wrench className="text-teal" size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-lg text-charcoal">
                Recent Tools
              </h2>
              <p className="text-sm text-muted">No tools used yet</p>
            </div>
          </div>
          <Link
            to="/tools"
            className="text-sm text-teal hover:text-teal/80 font-medium"
          >
            Browse Tools →
          </Link>
        </Card>

        {/* Unpaid invoices */}
        <Card hoverable>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-button bg-warning/10 flex items-center justify-center">
              <FileText className="text-warning" size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-lg text-charcoal">
                Unpaid Invoices
              </h2>
              <p className="text-sm text-muted">All caught up</p>
            </div>
          </div>
          <Link
            to="/clients"
            className="text-sm text-teal hover:text-teal/80 font-medium"
          >
            Manage Clients →
          </Link>
        </Card>

        {/* Quick start */}
        <Card hoverable>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-button bg-success/10 flex items-center justify-center">
              <Zap className="text-success" size={20} />
            </div>
            <div className="flex-1">
              <h2 className="font-heading font-semibold text-lg text-charcoal">
                Quick Start
              </h2>
              <p className="text-sm text-muted">
                Press{' '}
                <kbd className="px-1.5 py-0.5 bg-sand rounded text-xs">
                  Ctrl+K
                </kbd>{' '}
                to search
              </p>
            </div>
          </div>
          <Link
            to="/tools"
            className="text-sm text-teal hover:text-teal/80 font-medium"
          >
            Explore →
          </Link>
        </Card>
      </div>
    </div>
  );
}
