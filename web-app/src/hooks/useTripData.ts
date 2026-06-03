import { useState, useEffect } from 'react';
import type { Trip, User, MediaManifest } from '../types/polarsteps';
import { fetchData } from '../services/dataService';

export const useTripData = () => {
  const [data, setData] = useState<{ trip: Trip; user: User; manifest: MediaManifest } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
