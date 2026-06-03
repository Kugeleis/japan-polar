import { useState, useEffect, useRef } from 'react';
import { useTripData } from './hooks/useTripData';
import { MapComponent } from './components/MapComponent/MapComponent';
import { Timeline } from './components/Timeline/Timeline';
import './App.css';

function App() {
  const { data, loading, error } = useTripData();
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  const timelineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header className="app-header container-fluid">
        <div className="header-content">
          <div className="title-group">
            <h1 className="trip-title">Zwei Monate Japan</h1>
            <span className="trip-subtitle">
              By {user.first_name} {user.last_name} • mehr unter <a href="https://bike-in-japan.de" target="_blank" rel="noopener noreferrer">bike-in-japan.de</a>
            </span>
          </div>
          <button 
            className="secondary theme-toggle" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className="app-main container-fluid">
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
