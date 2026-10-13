import {
  Wrench,
  Zap,
  Puzzle,
  BookOpen,
  GraduationCap,
  Lightbulb
} from 'lucide-react';

/**
 * GHL Tools — Go High Level specific tools
 */

export default function GHLTools() {
  const tools = [
    {
      id: 'ai-prompt-vault',
      name: 'AI Prompt Vault',
      description: 'Collection of proven AI prompts for GHL',
      icon: Lightbulb,
    },
    {
      id: 'workflow-creator',
      name: 'Workflow Creator',
      description: 'Create and optimize GHL workflows',
      icon: Zap,
    },
    {
      id: 'a2p-10dlc-wizard',
      name: 'A2P 10DLC Wizard',
      description: 'Setup guide for A2P 10DLC registration',
      icon: Wrench,
    },
    {
      id: 'voice-ai-prompt-generator',
      name: 'Voice AI Prompt Generator',
      description: 'Generate prompts for Voice AI',
      icon: Lightbulb,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-2">
          GHL Tools
        </h1>
        <p className="text-muted">
          Specialized tools for Go High Level users
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-surface border border-border rounded-card p-6 hover:border-orange transition-colors group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-tint flex items-center justify-center mb-4 group-hover:bg-orange transition-colors">
                <Icon className="w-6 h-6 text-orange group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-lg text-charcoal mb-2">
                {tool.name}
              </h3>
              <p className="text-sm text-muted">
                {tool.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
