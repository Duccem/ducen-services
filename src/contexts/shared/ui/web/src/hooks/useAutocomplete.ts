import { useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';

export const useAutocomplete = (options: any[], value: any, autocomplete = false) => {
  const [filtered, setFiltered] = useState(options);
  const debouncedValue = useDebounce(value, 750);
  useEffect(() => {
    const handleAutoComplete = () => {
      if (!autocomplete) return;
      if (!value || value === '') {
        setFiltered(options);
        return;
      }
      const filter = options.filter((option) => option.value.toLowerCase().includes(debouncedValue.toString().toLowerCase()));
      setFiltered(filter);
    };
    handleAutoComplete();
  }, [debouncedValue, options]);

  return {
    filtered,
  };
};
