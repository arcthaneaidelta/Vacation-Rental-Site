import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeId, onChange, className = '' }) => {
  return (
    <div className={`tabs no-scrollbar ${className}`} role="tablist">
      {items.map((tab) => {
        const isSelected = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(tab.id)}
            className={`tab flex items-center gap-2 pb-3.5 pt-1 text-sm font-semibold transition-colors relative ${
              isSelected ? 'text-tide-900' : 'text-ink-500 hover:text-ink-900'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isSelected
                    ? 'bg-seaglass-100 text-tide-900 font-semibold'
                    : 'bg-sand-100 text-ink-500'
                }`}
              >
                {tab.count}
              </span>
            )}
            {isSelected && (
              <span
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-brass-500 rounded-full"
                layout-id="active-tab"
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
