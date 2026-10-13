import React from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Add subtle hover lift effect */
  hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ hoverable, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface border border-border rounded-card p-5',
          'shadow-soft transition-shadow duration-[var(--duration-fast)]',
          hoverable && 'hover:shadow-md cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
