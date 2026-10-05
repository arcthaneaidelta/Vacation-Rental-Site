import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpenId,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : []);

  const toggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`divide-y divide-line-200 border-y border-line-200 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div key={item.id} className="py-2" id={item.id}>
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`acc-content-${item.id}`}
              className="w-full py-4 text-left flex items-center justify-between gap-4 text-tide-900 group"
            >
              <span className="font-serif text-lg md:text-xl font-medium group-hover:text-tide-800">
                {item.title}
              </span>
              <ChevronDown
                className="w-5 h-5 shrink-0 text-ink-500 acc-chevron transition-transform duration-200"
                strokeWidth={1.5}
              />
            </button>
            <div
              id={`acc-content-${item.id}`}
              data-open={isOpen ? 'true' : 'false'}
              className="acc-panel"
            >
              <div className="pb-5 pt-1 text-ink-600 text-[15px] leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
