import { InputHTMLAttributes } from "react";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';
type CheckProps = InputHTMLAttributes<HTMLInputElement> & { onChange?: (value: boolean) => void };

export const Check = ({ placeholder, name, ...props }: CheckProps) => {
  return (
    <InputContainer placeholder={null}  {...props} id={name}>
      <label htmlFor={name} className={styles.input__check__label}>
        {placeholder}
        <input className={styles.input__input} placeholder="&nbsp;" type='checkbox' id={name} name={name} {...props}/>
        <span className={styles.input__check__span}></span>
      </label>
    </InputContainer>
  )
}
