export const email = (value: string): string | null => {
  if (!/^(?!.*[-_.]{2})[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/.test(value)) {
    return 'This is not a valid email!';
  }

  return null;
};
