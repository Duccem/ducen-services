import { FormHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { LayoutProps, SpaceProps } from "styled-system";
import { StyledForm } from "./form.style";

export type FormProps = {
  onSubmit: any;
  onReset?: any;
}

export const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps & SpaceProps & LayoutProps & FormHTMLAttributes<HTMLFormElement>>>(({ children, onSubmit, onReset, ...props }, ref) => {
  return(
    <StyledForm ref={ref} onSubmit={onSubmit} onReset={onReset} {...props}>
      {children}
    </StyledForm>
  )
})
