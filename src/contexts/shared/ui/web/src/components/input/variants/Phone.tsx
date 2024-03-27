import { useMask } from "@react-input/mask";
import { InputHTMLAttributes } from "react";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';

export const Phone = ({ placeholder, code , ...props }: InputHTMLAttributes<HTMLInputElement> & { code: string }) => {
  const inputRef = useMask({ mask: '(___) ___-__-__', replacement: { _: /\d/ } });
  return (
    <InputContainer placeholder={placeholder} {...props}>
      <input ref={inputRef} className={styles.input__input +  ' ' + styles.input__phone} placeholder="&nbsp;" type="text" {...props}/>
      <span className={styles.input__phone__code}>{code}</span>
    </InputContainer>
  )
}
