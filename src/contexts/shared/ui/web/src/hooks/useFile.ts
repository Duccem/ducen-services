import { ChangeEvent, useEffect, useState } from 'react';

export function useFile(changeValue?: (newValue: string) => void) {
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!changeValue) return;
    let fileReader: FileReader,
      cancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = ({ target }: ProgressEvent<FileReader>) => {
        const { result } = target;
        if (result && !cancel) changeValue(result as string);
      };
      fileReader.readAsDataURL(file);
    } else {
      changeValue(null);
    }

    return () => {
      cancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return {
    handleChange,
  };
}
