import { useLocation } from 'react-router-dom';
import { WrenchIcon } from '@heroicons/react/24/outline';

/**
 * ToolPlaceholder - Generic placeholder for tools under development
 */

export default function ToolPlaceholder() {
  const location = useLocation();
  const toolName = location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Tool';

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-6 bg-orange-tint rounded-full flex items-center justify-center">
          <WrenchIcon className="w-10 h-10 text-orange" />
        </div>
        <h1 className="text-3xl font-heading font-bold text-charcoal mb-3">
          {toolName}
        </h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          This tool is currently under development. Check back soon for updates!
        </p>
        <a
          href="/tools"
          className="inline-block px-6 py-3 bg-orange text-white rounded-button hover:bg-[#E64800] transition-colors"
        >
          Browse Other Tools
        </a>
      </div>
    </div>
  );
}
