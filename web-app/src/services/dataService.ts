import type { Trip, User, MediaManifest } from '../types/polarsteps';

export const fetchData = async () => {
  // In a real app, we might want to discover which trip to load.
  // For now, we hardcode the paths based on the provided extract.
  const tripId = 'japan_24685604';
  
  const [tripResponse, userResponse, manifestResponse] = await Promise.all([
    fetch(`./trip/${tripId}/trip.json`),
    fetch('./user/user.json'),
    fetch('./media-manifest.json')
  ]);

  if (!tripResponse.ok || !userResponse.ok || !manifestResponse.ok) {
    throw new Error('Failed to load data');
  }

  const trip: Trip = await tripResponse.json();
  const user: User = await userResponse.json();
  const manifest: MediaManifest = await manifestResponse.json();

  return { trip, user, manifest };
};
