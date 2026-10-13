import React from 'react';
import { cn } from '@/lib/cn';

/**
 * Button — the primary interactive element.
 *
 * Variants:
 *   primary  → orange background, white text (bold 18px+ only for WCAG)
 *   secondary → teal outline
 *   ghost    → no background, subtle hover
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-orange text-white font-semibold hover:bg-[#E64800] active:bg-[#CC4000]',
  secondary:
    'border border-teal text-teal hover:bg-teal-tint active:bg-teal/10',
  ghost:
    'text-charcoal hover:bg-sand active:bg-border',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2 gap-2',
  lg: 'text-base px-6 py-2.5 gap-2',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', icon, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-button transition-colors',
          'duration-[var(--duration-fast)] disabled:opacity-50 disabled:pointer-events-none',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange focus-visible:outline-offset-2',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
