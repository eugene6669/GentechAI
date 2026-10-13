import {
  Puzzle,
  Camera,
  Youtube
} from 'lucide-react';

/**
 * Extensions — Browser extensions and add-ons
 */

export default function Extensions() {
  const extensions = [
    {
      id: 'job-clipper',
      name: 'Job Clipper',
      description: 'Save job listings from any site',
      icon: Puzzle,
      url: '#',
    },
    {
      id: 'page-shot',
      name: 'Page Shot',
      description: 'Capture full page screenshots',
      icon: Camera,
      url: '#',
    },
    {
      id: 'yt2text-extension',
      name: 'YT2Text Extension',
      description: 'Extract text from YouTube videos',
      icon: Youtube,
      url: '#',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
          Extensions
        </h1>
        <p className="text-muted">
          Browser extensions to boost your productivity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {extensions.map((ext) => {
          const Icon = ext.icon;
          return (
            <a
              key={ext.id}
              href={ext.url}
              className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-tint flex items-center justify-center mb-4 group-hover:bg-teal transition-colors">
                <Icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
                {ext.name}
              </h3>
              <p className="text-sm text-muted mb-4">
                {ext.description}
              </p>
              <span className="text-sm text-orange font-medium">
                Download →
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
