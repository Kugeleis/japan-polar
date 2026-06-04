import type { Trip, User, MediaManifest } from '../types/polarsteps';

export const fetchData = async () => {
  // In a real app, we might want to discover which trip to load.
  // For now, we hardcode the paths based on the provided extract.
  const tripId = 'japan_24685604';
  
  const baseUrl = import.meta.env.BASE_URL;
  
  const [tripResponse, userResponse, manifestResponse] = await Promise.all([
    fetch(`${baseUrl}trip/${tripId}/trip.json`),
    fetch(`${baseUrl}user/user.json`),
    fetch(`${baseUrl}media-manifest.json`)
  ]);

  if (!tripResponse.ok || !userResponse.ok || !manifestResponse.ok) {
    throw new Error('Failed to load data');
  }

  const trip: Trip = await tripResponse.json();
  const user: User = await userResponse.json();
  const manifest: MediaManifest = await manifestResponse.json();

  // Normalize manifest paths with baseUrl
  Object.keys(manifest).forEach(stepId => {
    manifest[stepId].photos = (manifest[stepId].photos as any[]).map(p => {
      // Support both old string format and new object format for resilience
      const original = typeof p === 'string' ? p : p.original;
      const thumb = typeof p === 'string' ? p : (p.thumb || p.original);
      
      return {
        original: `${baseUrl}${original.replace(/^\.\//, '')}`,
        thumb: `${baseUrl}${thumb.replace(/^\.\//, '')}`
      };
    });
    manifest[stepId].videos = manifest[stepId].videos.map(v => `${baseUrl}${v.replace(/^\.\//, '')}`);
  });

  return { trip, user, manifest };
};
