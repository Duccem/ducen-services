export const url = (value: string): string | null => {
  if (!/^(ftp|http|https):\/\/[^ "]+$/.test(value)) {
    return 'This is not a valid URL!';
  }

  return null;
};
