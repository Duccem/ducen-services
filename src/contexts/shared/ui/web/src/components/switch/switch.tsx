
import { InputProps } from "../input/types";
import { StyledSwitch } from "./switch.style";

export function Switch({ activeText, disableText, ...props }: InputProps & { activeText: string, disableText: string }) {
  return <>
    <StyledSwitch activeText={activeText} disableText={disableText}>
      <input type="checkbox" name="" id="" {...props}/>
      <span className="slider"></span>
    </StyledSwitch>
  </>
}
