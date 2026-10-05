import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`card border-dashed border-line-300 bg-sand-50/50 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto ${className}`}
    >
      {icon && <div className="mb-3 text-ink-500">{icon}</div>}
      <h4 className="h4 font-serif text-tide-900 mb-1">{title}</h4>
      {message && <p className="text-sm text-ink-600 mb-6 max-w-xs">{message}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
