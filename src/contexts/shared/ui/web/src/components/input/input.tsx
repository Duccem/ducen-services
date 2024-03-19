import { InputHTMLAttributes } from "react";
import { InputContainer } from "./components/Container";
import styles from './input.module.css';
import { Check } from "./variants/Check";
import { Date } from "./variants/Date";
import { File } from "./variants/File";
import { Password } from "./variants/Password";
import { Select } from "./variants/Select";
import { Text } from "./variants/Text";

export const Input = ({ placeholder, className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <InputContainer placeholder={placeholder} {...props}>
      <input className={styles.input__input + ' ' + className} placeholder="&nbsp;" type="text" {...props}/>
    </InputContainer>
  )
}

Input.Text = Text;
Input.File = File;
Input.Date = Date;
Input.Password = Password;
Input.Check = Check;
Input.Select = Select;
