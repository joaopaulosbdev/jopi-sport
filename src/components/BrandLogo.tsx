'use client';

import React from 'react';
import { getAssetUrl } from '@/utils/basePath';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon';
  alt?: string;
}

export default function BrandLogo({
  className = 'w-10 h-10 object-cover',
  variant = 'icon',
  alt = 'Jopi Sport Shop',
}: BrandLogoProps) {
  const imagePath = variant === 'full' ? '/images/logo.png' : '/images/sublogo.png';
  const initialSrc = getAssetUrl(imagePath);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    if (!target.dataset.triedFallback) {
      target.dataset.triedFallback = 'true';
      // If failed with /jopi-sport, try direct /images/...; otherwise try adding /jopi-sport
      if (target.src.includes('/jopi-sport')) {
        target.src = target.src.replace('/jopi-sport', '');
      } else {
        try {
          const url = new URL(target.src);
          url.pathname = `/jopi-sport${url.pathname}`;
          target.src = url.toString();
        } catch {
          target.src = `/jopi-sport${imagePath}`;
        }
      }
    }
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={initialSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
}
