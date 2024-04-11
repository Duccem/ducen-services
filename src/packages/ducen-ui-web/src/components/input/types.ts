import { InputHTMLAttributes } from 'react';

export type InputBaseProps = {
  error?: string;
  icon?: JSX.Element;
  iconAction?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;
