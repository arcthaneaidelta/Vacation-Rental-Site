import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Archive, 
  Sparkles, 
  Waves, 
  FileText 
} from 'lucide-react';
import type { ApplicationStatus, ListingStatus } from '../../data/types';

export type BadgeVariant = 
  | ApplicationStatus 
  | ListingStatus 
  | 'oceanfront' 
  | 'founding' 
  | 'featured' 
  | 'neutral';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, label, size = 'md', className = '' }) => {
  let bgText = '';
  let icon: React.ReactNode = null;
  let text = label;

  switch (variant) {
    case 'pending':
      bgText = 'bg-warn-100 text-warn-600 border border-warn-600/30';
      icon = <Clock className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || 'Pending review';
      break;
    case 'approved':
    case 'live':
      bgText = 'bg-ok-100 text-ok-600 border border-ok-600/30';
      icon = <CheckCircle2 className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || (variant === 'live' ? 'Live' : 'Approved');
      break;
    case 'changes':
      bgText = 'bg-warn-100 text-warn-600 border border-warn-600/30';
      icon = <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || 'Changes requested';
      break;
    case 'rejected':
      bgText = 'bg-err-100 text-err-600 border border-err-600/30';
      icon = <XCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || 'Declined';
      break;
    case 'draft':
      bgText = 'bg-sand-100 text-ink-600 border border-line-300';
      icon = <FileText className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || 'Draft';
      break;
    case 'archived':
      bgText = 'bg-sand-200 text-ink-500 border border-line-200';
      icon = <Archive className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />;
      text = text || 'Archived';
      break;
    case 'oceanfront':
      bgText = 'bg-seaglass-100 text-tide-900 border border-seaglass-500/40';
      icon = <Waves className="w-3.5 h-3.5 text-seaglass-500 shrink-0" strokeWidth={2} />;
      text = text || 'Oceanfront';
      break;
    case 'founding':
      bgText = 'bg-sand-100 text-brass-600 border border-brass-500/40 font-semibold';
      icon = <Sparkles className="w-3.5 h-3.5 text-brass-600 shrink-0" strokeWidth={2} />;
      text = text || 'Founding listing';
      break;
    case 'featured':
      bgText = 'bg-sand-0 text-tide-900 border border-line-300 shadow-1';
      icon = <Sparkles className="w-3.5 h-3.5 text-brass-500 shrink-0" strokeWidth={2} />;
      text = text || 'Featured';
      break;
    case 'neutral':
    default:
      bgText = 'bg-sand-100 text-ink-600 border border-line-200';
      text = text || 'Notice';
      break;
  }

  const sizeCls = size === 'sm' ? 'text-[11px] py-0.5 px-2 gap-1' : 'text-xs py-1 px-2.5 gap-1.5';

  return (
    <span className={`badge ${sizeCls} ${bgText} ${className}`}>
      {icon}
      <span>{text}</span>
    </span>
  );
};
