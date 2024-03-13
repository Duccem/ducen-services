import styled from 'styled-components';
import { layout, space } from 'styled-system';
import { StyledTypes } from './types';
export const StyledContainer = styled.div<StyledTypes>`
  position: relative;
  ${space}
  ${layout}
`;
export const StyledInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 2px solid ${(props) => props.theme.colors.black};
  box-shadow: 3px 3px ${(props) => props.theme.colors.dark_gray};
  border-radius: 5px;
  &:not(:placeholder-shown),
  &:focus {
    ~ label {
      background-color: white;
      line-height: 10px;
      opacity: 1;
      top: -7px;
    }
  }

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.dark_gray};
  }
  &:hover {
    box-shadow: 6px 6px #282825;
  }
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
  &[type='file'] {
    padding-top: 5px;
    &::file-selector-button {
      display: none;
    }
  }
  &[type='date'] {
    &::-webkit-calendar-picker-indicator {
      background: transparent;
      bottom: 0;
      color: transparent;
      cursor: pointer;
      height: auto;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: auto;
    }
  }
  &[type='checkbox'] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
    :checked ~ span {
      position: absolute;
      left: 0;
      height: 25px;
      width: 25px;
      border: solid ${(props) => props.theme.colors.black};
      border-radius: ${(props) => props.theme.radii.small};
      box-shadow: 2px 2px ${(props) => props.theme.colors.dark_gray};
    }
    :checked ~ span:after {
      border: solid ${(props) => props.theme.colors.black};
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      border-width: 0 3px 3px 0;
      width: 7px;
      left: 7px;
      top: 4px;
      transform: rotate(45deg);
    }
  }
`;
export const StyledIcon = styled.div`
  display: block;
  position: absolute;
  top: 10px;
  right: 12px;
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }
  background-color: ${(props) => props.theme.colors.white};
`;
export const StyledText = styled.label`
  display: block;
  position: absolute;
  top: 0;
  line-height: 40px;
  color: ${(props) => props.theme.colors.black};
  font-size: ${(props) => props.theme.fontSizes.p3};
  font-weight: ${(props) => props.theme.fontWeights[4]};
  opacity: 0.75;
  left: 5px;
  padding: 0 5px;
  transition: line-height 200ms ease-in-out, font-size 200ms ease-in-out, top 200ms ease-in-out;
  pointer-events: none;
`;
export const StyledError = styled.ul`
  color: ${(props) => props.theme.colors.fuchsia};
  margin-right: ${(props) => props.theme.space[2]}px;
  margin-top: ${(props) => props.theme.space[2]}px;
  font-size: ${(props) => props.theme.fontSizes.p3}px;
  font-weight: ${(props) => props.theme.fontWeights[4]};
  text-align: end;
`;
export const StyledSpan = styled.span`
  position: absolute;
  left: 0;
  height: 25px;
  width: 25px;
  border: solid ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.radii.small};
  box-shadow: 2px 2px ${(props) => props.theme.colors.dark_gray};
  &:hover {
    box-shadow: 4px 4px #282825;
  }
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;

  :after {
    content: '';
    position: absolute;
    left: 5px;
    top: 1px;
    width: 10px;
    height: 10px;
    border: solid ${(props) => props.theme.colors.black};
    border-width: 0 0 3px 0;
  }
`;

export const CheckLabel = styled.label`
  margin-top: 15px;
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
