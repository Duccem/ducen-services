import { faEye, faEyeLowVision } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { BaseInput } from "../base";
import { StyledInput } from "../style";
import { InputProps } from "../types";

export function PasswordInput({ placeholder , ...props }: InputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <BaseInput placeholder={placeholder} {...props}  icon ={visible ? faEye : faEyeLowVision} iconAction={() => setVisible(!visible)}>
      <StyledInput placeholder="&nbsp;" type={ visible ? 'text' : 'password' } {...props} />
    </BaseInput>
  )
}
