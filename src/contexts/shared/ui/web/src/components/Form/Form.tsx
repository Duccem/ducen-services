import { FormHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import styles from './form.module.css';

export type FormProps = {
  onSubmit: any;
  onReset?: any;
}

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps & FormHTMLAttributes<HTMLFormElement>>>(({ children, onSubmit, onReset, className, ...props }, ref) => {
  return(
    <form ref={ref} className={styles.form__form + ' ' + className} onSubmit={onSubmit} onReset={onReset} {...props}>
      {children}
    </form>
  )
})
