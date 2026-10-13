import {
  Lightbulb,
  Code,
  BookOpen,
  Github
} from 'lucide-react';

/**
 * Learn — Learning resources and documentation
 */

export default function Learn() {
  const resources = [
    {
      id: 'ai-explained',
      name: 'AI Explained',
      description: 'Understand how AI works and its applications',
      icon: Lightbulb,
      articles: 15,
    },
    {
      id: 'claude-skills',
      name: 'Claude Skills',
      description: 'Advanced techniques for using Claude AI',
      icon: Code,
      articles: 20,
    },
    {
      id: 'framework',
      name: 'Framework',
      description: 'Our productivity framework and methodologies',
      icon: BookOpen,
      articles: 10,
    },
    {
      id: 'github-repo',
      name: 'GitHub Repo',
      description: 'Access our open-source code and templates',
      icon: Github,
      link: 'https://github.com',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
          Learn
        </h1>
        <p className="text-muted">
          Educational resources and documentation
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => {
          const Icon = resource.icon;
          const isExternal = !!resource.link;
          
          const content = (
            <>
              <div className="w-12 h-12 rounded-lg bg-teal-tint flex items-center justify-center mb-4 group-hover:bg-teal transition-colors">
                <Icon className="w-6 h-6 text-teal group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
                {resource.name}
              </h3>
              <p className="text-sm text-muted mb-3">
                {resource.description}
              </p>
              {resource.articles && (
                <span className="text-xs text-muted">
                  {resource.articles} articles
                </span>
              )}
              {isExternal && (
                <span className="text-sm text-orange font-medium">
                  Visit GitHub →
                </span>
              )}
            </>
          );

          if (isExternal) {
            return (
              <a
                key={resource.id}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors group"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={resource.id}
              className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors group cursor-pointer"
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
