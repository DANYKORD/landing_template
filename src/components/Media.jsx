import React from 'react';

// Показує фото або відео (mp4/webm), знайдене в content/photos
export default function Media({ media, alt = '', className = '', lazy = false }) {
  if (!media) return null;

  if (media.isVideo) {
    return <video src={media.src} className={className} autoPlay muted loop playsInline />;
  }

  return (
    <img
      src={media.src}
      alt={alt}
      className={className}
      loading={lazy ? 'lazy' : undefined}
      decoding="async"
      draggable={false}
    />
  );
}
