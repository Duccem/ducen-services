export const match = (value: string | number | boolean | number, revalue: string | number, fieldName?: string): string | null => {
  if (value !== revalue) {
    return `${fieldName ? fieldName : 'Fields'} must match!`;
  }

  return null;
};
