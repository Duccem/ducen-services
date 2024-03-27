import { useEffect, useState } from 'react';
import { usePrincipalContext } from '../PrincipalContext';

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState([]);
  const { configurations } = usePrincipalContext();
  useEffect(() => {
    async function getCountries() {
      const response = await fetch(configurations.countriesUrl);
      const data = await response.json();
      const sorted = data.sort((a, b) => (a.name.common < b.name.common ? -1 : 1));
      setCountries(
        sorted.map((country) => ({ label: country.name.common, value: country.name.common, icon: country.flags.png })),
      );
      setPhoneCodes(
        sorted.map((country) => ({
          label:
            (country.idd.root?.toString() || country.name.common) +
            (country.idd.suffixes && country.idd.suffixes?.length == 1 ? country.idd.suffixes?.at(0).toString() : ''),
          value: country.name.common,
          icon: country.flags.png,
        })),
      );
    }
    getCountries();
  }, []);
  return {
    countries,
    phoneCodes,
  };
}
