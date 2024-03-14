import { useState } from 'react';

export function useConfData() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const lang = navigator.language;
  const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setLatitude(lat);
    setLongitude(long);
  });
  return {
    timezone,
    lang,
    theme,
    latitude,
    longitude,
  };
}
