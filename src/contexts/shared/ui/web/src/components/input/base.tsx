import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef } from "react";
import { StyledContainer, StyledError, StyledIcon, StyledText } from './style';
import { BaseProps } from './types';
import { DateInput } from "./variants/DateInput";
import { FileInput } from "./variants/FileInput";
import { PasswordInput } from "./variants/PasswordInput";
import { TextInput } from "./variants/TextInput";

export function InputError({ error }: { error: string }) {

  if (!error) return null;
  return (
    <StyledError className='error'>
      {
        error
      }
    </StyledError>
  )
}

export function InputIcon({ icon, iconAction }) {
  if(!icon) return null;
  const props = iconAction ? { onClick: iconAction } : {  };
  return (
    <StyledIcon {...props}>
      <FontAwesomeIcon icon={icon}/>
    </StyledIcon>
  )
}

export const BaseInput = forwardRef<HTMLInputElement, BaseProps>(({ children, placeholder, error, icon, iconAction, id, ...props }, ref) => {
  return (
    <StyledContainer {...props} ref={ref}>
      {children}
      <StyledText htmlFor={id}>{placeholder}</StyledText>
      <InputIcon icon={icon} iconAction={iconAction} />
      <InputError error={error}/>
    </StyledContainer>
  )
})



export const Input = Object.assign({}, {
  Text: TextInput,
  Password: PasswordInput,
  File: FileInput,
  Date: DateInput
})
