import { useState } from 'react';
import './MediaGallery.css';
import { Lightbox } from './Lightbox';
import type { Photo } from '../../types/polarsteps';

interface MediaGalleryProps {
  photos: Photo[];
  videos: string[];
}

export const MediaGallery = ({ photos, videos }: MediaGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Create unified items for the gallery thumbnails
  const thumbItems = [
    ...videos.map(v => ({ type: 'video' as const, url: v })),
    ...photos.map(p => ({ type: 'photo' as const, url: p.thumb }))
  ];

  // Create unified items for the lightbox (full size)
  const fullItems = [
    ...videos,
    ...photos.map(p => p.original)
  ];

  if (thumbItems.length === 0) return null;

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === null || prev === 0 ? fullItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === null || prev === fullItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="media-gallery">
      {thumbItems.map((item, index) => {
        return (
          <div 
            key={index} 
            className={`media-item ${item.type}`}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
          >
            {item.type === 'video' ? (
              <video src={item.url} muted />
            ) : (
              <img src={item.url} alt="" loading="lazy" />
            )}
          </div>
        );
      })}

      {selectedIndex !== null && (
        <Lightbox
          items={fullItems}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
