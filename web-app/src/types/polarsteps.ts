export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  living_location_name: string;
  profile_image_path: string | null;
}

export interface Location {
  id: number;
  name: string;
  detail: string;
  full_detail: string;
  country_code: string;
  lat: number;
  lon: number;
}

export interface Step {
  id: number;
  name: string;
  display_name: string;
  description: string;
  slug: string;
  start_time: number;
  location: Location;
  weather_condition: string;
  weather_temperature: number;
}

export interface Trip {
  id: number;
  name: string;
  summary: string;
  start_date: number;
  end_date: number;
  all_steps: Step[];
  cover_photo_path: string;
}

export interface Photo {
  original: string;
  thumb: string;
}

export interface MediaManifest {
  [stepId: string]: {
    photos: Photo[];
    videos: string[];
  };
}
