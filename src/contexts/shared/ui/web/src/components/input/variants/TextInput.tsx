import { BaseInput } from "../base";
import { StyledInput } from "../style";
import { InputProps } from "../types";

export function TextInput({ placeholder, ...props }: InputProps) {
  return (
    <BaseInput placeholder={placeholder} {...props}>
      <StyledInput placeholder="&nbsp;" type='text' {...props}/>
    </BaseInput>
  )
}
