import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

interface LightboxProps {
  items: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox = ({ items, currentIndex, onClose, onPrev, onNext }: LightboxProps) => {
  const currentItem = items[currentIndex];
  const isVideo = currentItem?.toLowerCase().endsWith('.mp4');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  if (!currentItem) return null;

  return createPortal(
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">×</button>
      
      {items.length > 1 && (
        <>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous">‹</button>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next">›</button>
        </>
      )}

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        {isVideo ? (
          <video src={currentItem} controls autoPlay />
        ) : (
          <img src={currentItem} alt="" />
        )}
      </div>

      <div className="lightbox-counter">
        {currentIndex + 1} / {items.length}
      </div>
    </div>,
    document.body
  );
};
