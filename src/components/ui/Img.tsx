import React, { useState } from 'react';
import type { Photo } from '../../data/types';
import { unsplashUrl } from '../../data/images';
import { Camera } from 'lucide-react';

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  photo?: Photo;
  widthPx?: number;
  heightPx?: number;
  aspect?: string;
  zoomOnHover?: boolean;
  priority?: boolean;
}

export const Img: React.FC<ImgProps> = ({
  photo,
  src,
  alt,
  widthPx = 800,
  heightPx,
  aspect,
  className = '',
  zoomOnHover = false,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let finalSrc = src;
  let finalAlt = alt || photo?.alt || 'Beach condo photograph';
  let bgColor = photo?.color || '#E8E2D7';

  if (photo) {
    if (photo.kind === 'unsplash') {
      finalSrc = unsplashUrl(photo.src, widthPx, heightPx);
    } else {
      finalSrc = photo.src;
    }
  }

  if (error || !finalSrc) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-4 text-center select-none bg-sand-100 text-ink-500 ${className}`}
        style={{ aspectRatio: aspect }}
        role="img"
        aria-label={finalAlt}
      >
        <Camera className="w-6 h-6 mb-1 text-ink-500/70" strokeWidth={1.5} />
        <span className="text-xs font-medium text-ink-500 line-clamp-1 max-w-[85%]">{finalAlt}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: bgColor, aspectRatio: aspect }}
    >
      <img
        src={finalSrc}
        alt={finalAlt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${zoomOnHover ? 'img-zoom' : ''}`}
        {...props}
      />
    </div>
  );
};
