import './MediaGallery.css';

interface MediaGalleryProps {
  photos: string[];
  videos: string[];
}

export const MediaGallery = ({ photos, videos }: MediaGalleryProps) => {
  if (photos.length === 0 && videos.length === 0) return null;

  return (
    <div className="media-gallery">
      {videos.map((video, index) => (
        <div key={`video-${index}`} className="media-item video">
          <video src={video} controls />
        </div>
      ))}
      {photos.map((photo, index) => (
        <div key={`photo-${index}`} className="media-item photo">
          <img src={photo} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  );
};
