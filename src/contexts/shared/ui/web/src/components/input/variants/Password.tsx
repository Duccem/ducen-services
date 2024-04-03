import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, useState } from "react";
import { InputContainer } from "../components/Container";
import styles from '../input.module.css';

const PasswordIcon = ({ visible })=> (
  <FontAwesomeIcon icon={visible ? faEye : faEyeLowVision}/>
)

export const PasswordInput = ({ placeholder, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  const [visible, setVisible] = useState(false);
  return (
    <InputContainer placeholder={placeholder} {...props} icon={<PasswordIcon visible={visible}/>} iconAction={() => setVisible(!visible)}>
      <input className={styles.input__input} placeholder="&nbsp;" type={ visible ? 'text' : 'password' } {...props}/>
    </InputContainer>
  )
}
