import type { Step, MediaManifest } from '../../types/polarsteps';
import { StepDetail } from './StepDetail';

interface TimelineProps {
  steps: Step[];
  manifest: MediaManifest;
  activeStepId: number | null;
  onStepClick: (stepId: number) => void;
}

export const Timeline = ({ steps, manifest, activeStepId, onStepClick }: TimelineProps) => {
  return (
    <div className="timeline">
      {steps.map((step) => (
        <StepDetail
          key={step.id}
          step={step}
          media={manifest[step.id] || { photos: [], videos: [] }}
          isActive={activeStepId === step.id}
          onClick={() => onStepClick(step.id)}
        />
      ))}
    </div>
  );
};
