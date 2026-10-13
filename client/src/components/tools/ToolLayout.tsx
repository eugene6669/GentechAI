import { Card } from '@/components/ui';
import { cn } from '@/lib/cn';

/**
 * ToolLayout — consistent frame for every tool.
 *
 * Every tool in the app uses this component for a unified look:
 *   - Title and description at the top
 *   - Main content area (flexible, tool provides it)
 *   - Optional footer
 *
 * This keeps the UI calm and predictable: users know where the title is,
 * where the action is, and where results appear.
 */

interface ToolLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function ToolLayout({
  title,
  description,
  children,
  footer,
  className,
}: ToolLayoutProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-charcoal mb-2">
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-muted">{description}</p>
        )}
      </div>

      {/* Content */}
      <Card className={cn('min-h-[400px]', className)}>{children}</Card>

      {/* Footer */}
      {footer && <div className="mt-4 text-sm text-muted">{footer}</div>}
    </div>
  );
}
