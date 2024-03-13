import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { BaseInput } from "../base";
import { StyledInput } from "../style";
import { AllProps } from "../types";

export function DateInput({ value, placeholder, ...props }: AllProps) {
  return (
    <BaseInput placeholder={placeholder} {...props} icon={faCalendarAlt}>
      <StyledInput  type="date" value={value}  {...props}/>
    </BaseInput>
  )
}
