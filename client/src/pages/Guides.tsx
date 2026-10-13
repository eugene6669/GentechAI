import {
  BookOpen,
  Phone,
  CreditCard,
  CheckSquare,
  MessageSquare
} from 'lucide-react';

/**
 * Guides — Helpful guides and resources
 */

export default function Guides() {
  const guides = [
    {
      id: 'all-guides',
      name: 'All Guides',
      description: 'Browse all available guides',
      icon: BookOpen,
      count: 25,
    },
    {
      id: 'emergency-hotlines',
      name: 'Emergency Hotlines',
      description: 'Important emergency contact numbers',
      icon: Phone,
      count: 15,
    },
    {
      id: 'philippine-ids',
      name: 'Philippine IDs',
      description: 'Guide to Philippine identification documents',
      icon: CreditCard,
      count: 8,
    },
    {
      id: 'freelancing-checklist',
      name: 'Freelancing Checklist',
      description: 'Complete checklist for starting freelancing',
      icon: CheckSquare,
      count: 12,
    },
    {
      id: 'client-scripts',
      name: 'Client Scripts',
      description: 'Templates for client communications',
      icon: MessageSquare,
      count: 20,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
          Guides
        </h1>
        <p className="text-muted">
          Helpful guides and resources for freelancers
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => {
          const Icon = guide.icon;
          return (
            <div
              key={guide.id}
              className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-tint flex items-center justify-center group-hover:bg-orange transition-colors">
                  <Icon className="w-6 h-6 text-orange group-hover:text-white transition-colors" />
                </div>
                <span className="px-2 py-1 bg-sand rounded text-xs font-medium text-muted">
                  {guide.count} items
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
                {guide.name}
              </h3>
              <p className="text-sm text-muted">
                {guide.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
