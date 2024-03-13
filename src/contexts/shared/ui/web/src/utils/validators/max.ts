export const max = (value: string, length: number, fieldName?: string): string | null => {
  if (value.length > length) {
    return `${fieldName ? fieldName : 'This field'} has to be shorter than ${length} characters!`;
  }

  return null;
};
