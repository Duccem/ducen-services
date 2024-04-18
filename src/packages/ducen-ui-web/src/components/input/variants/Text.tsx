import { InputHTMLAttributes } from "react";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';

export const TextInput = ({ placeholder, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer placeholder={placeholder} {...props}>
      <input className={styles.input__input} placeholder="&nbsp;" type="text" {...props}/>
    </InputContainer>
  )
}
