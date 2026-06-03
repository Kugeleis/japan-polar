import { useState } from 'react';
import './MediaGallery.css';
import { Lightbox } from './Lightbox';

interface MediaGalleryProps {
  photos: string[];
  videos: string[];
}

export const MediaGallery = ({ photos, videos }: MediaGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const allMedia = [...videos, ...photos];

  if (allMedia.length === 0) return null;

  const handlePrev = () => {
    setSelectedIndex(prev => (prev === null || prev === 0 ? allMedia.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => (prev === null || prev === allMedia.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="media-gallery">
      {allMedia.map((item, index) => {
        const isVideo = item.toLowerCase().endsWith('.mp4');
        return (
          <div 
            key={index} 
            className={`media-item ${isVideo ? 'video' : 'photo'}`}
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
          >
            {isVideo ? (
              <video src={item} muted />
            ) : (
              <img src={item} alt="" loading="lazy" />
            )}
          </div>
        );
      })}

      {selectedIndex !== null && (
        <Lightbox
          items={allMedia}
          currentIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};
