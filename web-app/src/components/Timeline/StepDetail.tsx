import type { Step } from '../../types/polarsteps';
import { MediaGallery } from '../MediaGallery/MediaGallery';

interface StepDetailProps {
  step: Step;
  media: { photos: string[]; videos: string[] };
  isActive: boolean;
  onClick: () => void;
}

export const StepDetail = ({ step, media, isActive, onClick }: StepDetailProps) => {
  const date = new Date(step.start_time * 1000).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div 
      className={`step-card ${isActive ? 'active' : ''}`} 
      onClick={onClick}
      id={`step-${step.id}`}
    >
      <div className="step-header">
        <span className="step-date">{date}</span>
        {step.weather_temperature && (
          <span className="step-weather">
            {step.weather_temperature}°C
          </span>
        )}
      </div>
      <h3>{step.display_name}</h3>
      <p className="step-description">{step.description}</p>
      
      <MediaGallery photos={media.photos} videos={media.videos} />
    </div>
  );
};
