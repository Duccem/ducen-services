export const match = (value: string | number | boolean | number, fields, fieldName?: string): string | null => {
  const otherValue = fields[fieldName].value;
  if (value !== otherValue) {
    return `Value must match with ${fieldName}!`;
  }

  return null;
};
