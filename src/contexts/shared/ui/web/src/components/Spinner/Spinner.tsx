import { SpinnerWrapper } from "./Spinner.style";

export function Spinner() {
  return (
    <SpinnerWrapper className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </SpinnerWrapper>
  )
}
