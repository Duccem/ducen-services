import { PropsWithChildren } from "react";
import styled from "styled-components";

export const BackdropDiv = styled.div `
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.black};
  opacity: 0.3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Backdrop({ children, open }: PropsWithChildren<{ open: boolean }>) {
  if(!open) return null
  return (
    <BackdropDiv>
      {children}
    </BackdropDiv>
  )
}
