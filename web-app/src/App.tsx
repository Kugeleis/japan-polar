import { useState, useEffect, useRef } from 'react';
import { useTripData } from './hooks/useTripData';
import { MapComponent } from './components/MapComponent/MapComponent';
import { Timeline } from './components/Timeline/Timeline';
import './App.css';

function App() {
  const { data, loading, error } = useTripData();
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStepId) {
      const element = document.getElementById(`step-${activeStepId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [activeStepId]);

  if (loading) return <div className="loading">Loading trip data...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!data) return null;

  const { trip, user, manifest } = data;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="user-info">
          <h1>{trip.name}</h1>
          <p>By {user.first_name} {user.last_name} • {trip.summary}</p>
        </div>
      </header>
      <main className="app-main">
        <div className="map-sidebar">
          <MapComponent 
            steps={trip.all_steps} 
            activeStepId={activeStepId}
            onStepClick={setActiveStepId}
          />
        </div>
        <div className="timeline-container" ref={timelineContainerRef}>
          <Timeline 
            steps={trip.all_steps}
            manifest={manifest}
            activeStepId={activeStepId}
            onStepClick={setActiveStepId}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
