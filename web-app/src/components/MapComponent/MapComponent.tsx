import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { Step } from '../../types/polarsteps';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet with React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import shadowIcon from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: shadowIcon,
});

interface MapComponentProps {
  steps: Step[];
  activeStepId: number | null;
  onStepClick: (stepId: number) => void;
}

const RecenterMap = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, map.getZoom());
  }, [coords, map]);
  return null;
};

export const MapComponent = ({ steps, activeStepId, onStepClick }: MapComponentProps) => {
  const polyline: [number, number][] = steps.map(step => [step.location.lat, step.location.lon]);
  const activeStep = steps.find(s => s.id === activeStepId);

  return (
    <MapContainer 
      center={[35.6762, 139.6503]} 
      zoom={5} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Polyline positions={polyline} color="blue" />
      {steps.map((step) => (
        <Marker 
          key={step.id} 
          position={[step.location.lat, step.location.lon]}
          eventHandlers={{
            click: () => onStepClick(step.id),
          }}
        >
          <Popup>
            <strong>{step.display_name}</strong>
          </Popup>
        </Marker>
      ))}
      {activeStep && <RecenterMap coords={[activeStep.location.lat, activeStep.location.lon]} />}
    </MapContainer>
  );
};
