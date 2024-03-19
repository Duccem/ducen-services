import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './button.module.css';
export interface ButtonProps {
  submitting?: boolean;
}
export const Button = ({submitting, className ,...props}: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps) => {
  return (
    <button className={styles.button__button + ' ' + className} disabled={submitting} {...props}>
      {submitting ? <span className={styles.button__loader}></span> : props.children}
    </button>
  )
}

Button.Icon = ({ children }: PropsWithChildren) => {
  if(!children) return null;
  return (
    <div className={styles.button__icon}>
      {children}
    </div>
  )
}
