import { ForwardedRef, forwardRef } from 'react';
import styles from '../input.module.css';
import { InputBaseProps } from '../types';
import { InputError } from "./Error";
import { InputIcon } from "./Icon";



export const InputContainer = forwardRef((
  { icon, iconAction, error, children, placeholder, id }: InputBaseProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className={styles.input__container} ref={ref}>
      {children}
      <label htmlFor={id} className={styles.input__text}>{placeholder}</label>
      <InputIcon icon={icon} iconAction={iconAction}/>
      <InputError error={error}/>
    </div>
  )
})
