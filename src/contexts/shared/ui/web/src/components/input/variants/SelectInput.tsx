import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styled from "styled-components";
import { useAutocomplete } from "../../../hooks/useAutocomplete";
import useOutsideClick from "../../../hooks/useClickOutside";
import { useKeyboardShortcut } from "../../../hooks/useKeyboardShortcut";
import { BaseInput } from "../base";
import { StyledInput } from "../style";
import { InputProps, SelectProps } from "../types";
const Wrapper = styled.div<{ open?: boolean }>`
  position: relative;
  display: ${open ? 'block' : 'none'};
`
const Options = styled.div`
  position: absolute;
  top: 5px;
  width: 100%;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.black};
  box-shadow: 3px 3px ${(props) => props.theme.colors.dark_gray};
  border-radius: 5px;
  max-height: 200px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .active {
    background-color: ${(props) => props.theme.colors.purple};
  }
`
const OptionStyled = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.colors.purple};
    cursor: pointer;
  }
`
export const StyledOptionImage = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 9999px;
`;

export const StyledOptionSpan = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.black};
`;
export function Option({ icon = null, label = 'Option', active, ...props}) {
  return (
    <OptionStyled {...props} className={ `${active ? 'active' : ''}` }>
      { icon && <StyledOptionImage src={icon} alt="" /> }
      <StyledOptionSpan>{label}</StyledOptionSpan>
    </OptionStyled>
  )
}
export function SelectInput({ placeholder, value, options, onChange , autocomplete, ...props }: InputProps & SelectProps) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0);
  const wrapperRef = useRef(null);
  const { filtered } = useAutocomplete(options, value, autocomplete)
  useKeyboardShortcut(
    ["arrowdown"],
    () => {
      setActive((pa) => (pa === options.length - 1 ? 0 : pa + 1));
    },
    open
  );
  useKeyboardShortcut(
    ["arrowup"],
    () => {
      setActive((pa) => (pa <= 0 ? options.length - 1 : pa - 1));
    },
    open
  );

  useKeyboardShortcut(
    ["enter"],
    () => {
      const value = options[active]?.value;

      if (value !== undefined) {
        onChange(value);
        setOpen(false);
        setActive(-1);
      }
    },
    open
  );

  useKeyboardShortcut(
    ["escape"],
    () => {
      setOpen(false);
      setActive(-1);
    },
    open
  );
  useOutsideClick(wrapperRef, () => {
    setOpen(false);
  });
  const handleClick = (newValue: string) => {
    setOpen(!open)
    onChange(newValue)
  }


  return (
    <BaseInput ref={wrapperRef} placeholder={placeholder} {...props} icon={faAngleDown} iconAction={() => setOpen(!open)}>
      <StyledInput autoComplete="off" placeholder="&nbsp;" value={value} onChange={(event) => onChange(event.target.value)} type='text'  {...props} onClick={() => setOpen(!open)}/>
      <Wrapper style={{ display: `${open ? 'block' : 'none'}` }}>
        <Options>
          {
            filtered.map((option, index) => (
              <Option key={option.value + index.toString()} active={active == index} icon={option.icon} label={option.label} value={option.value} onClick={() => handleClick(option.value)}/>
            ))
          }
        </Options>
      </Wrapper>
    </BaseInput>
  )
}


