import React from 'react';
import { useStore } from '../../store/useStore';
import { Smartphone, Tablet, X } from 'lucide-react';

interface DeviceContainerProps {
  children: React.ReactNode;
}

export const DeviceContainer: React.FC<DeviceContainerProps> = ({ children }) => {
  const device = useStore((s) => s.demo.device);
  const setDemo = useStore((s) => s.setDemo);

  if (device === 'desktop') {
    return <>{children}</>;
  }

  const isMobile = device === 'mobile';
  const widthPx = isMobile ? '375px' : '768px';
  const heightPx = isMobile ? '812px' : '1024px';

  return (
    <div className="min-h-screen bg-sand-200/90 py-8 px-4 flex flex-col items-center justify-center">
      {/* Device Toolbar Header */}
      <div className="mb-4 flex items-center justify-between w-full max-w-md bg-white rounded-full px-4 py-2 shadow-2 border border-line-300 text-xs">
        <div className="flex items-center gap-2 text-tide-900 font-semibold">
          {isMobile ? <Smartphone className="w-4 h-4 text-brass-600" /> : <Tablet className="w-4 h-4 text-brass-600" />}
          <span>{isMobile ? 'Mobile Viewport (375px)' : 'Tablet Viewport (768px)'}</span>
        </div>
        <button
          onClick={() => setDemo({ device: 'desktop' })}
          className="text-ink-500 hover:text-ink-900 font-medium flex items-center gap-1"
        >
          <span>Exit to full desktop</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mock Hardware Frame */}
      <div
        className="relative bg-white rounded-[32px] shadow-3 border-4 border-tide-950 overflow-hidden flex flex-col"
        style={{ width: widthPx, height: heightPx, maxHeight: '90vh' }}
      >
        {/* Device Status Bar */}
        <div className="bg-sand-50 border-b border-line-200 px-6 py-2 flex items-center justify-between text-[11px] font-semibold text-tide-900 shrink-0 select-none">
          <span>9:41</span>
          <div className="w-20 h-4 bg-tide-900 rounded-full mx-auto" />
          <span>5G · 100%</span>
        </div>

        {/* Viewport Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
