export const password = (value: string): string | null => {
  if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(value)) {
    return 'This is not a valid Password!';
  }

  return null;
};
