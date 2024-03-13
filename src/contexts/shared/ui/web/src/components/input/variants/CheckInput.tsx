
import { BaseInput } from "../base"
import { CheckLabel, StyledInput, StyledSpan } from "../style"
import { AllProps } from "../types"

export function CheckInput({ placeholder, name, ...props }: AllProps) {
  return (
    <BaseInput placeholder={null}  {...props} id={name}>
      <CheckLabel htmlFor={name}>
        {placeholder}
        <StyledInput placeholder="&nbsp;" type='checkbox' id={name} name={name} {...props}/>
        <StyledSpan></StyledSpan>
      </CheckLabel>
    </BaseInput>
  )
}
