import { getCalendars, getLocales } from 'expo-localization';
import { getCurrentPositionAsync } from 'expo-location';
import { useState } from 'react';
import { Appearance } from 'react-native';

export function useConfData() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const timezone = getCalendars()[0].timeZone;
  const lang = getLocales()[0].languageCode;
  const theme = Appearance.getColorScheme();
  getCurrentPositionAsync().then((position) => {
    position.coords.latitude && setLatitude(position.coords.latitude);
    position.coords.longitude && setLongitude(position.coords.longitude);
  });
  return {
    timezone,
    lang,
    theme,
    latitude,
    longitude,
  };
}
