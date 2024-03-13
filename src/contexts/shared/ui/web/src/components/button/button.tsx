import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { LayoutProps, SpaceProps, layout, space } from 'styled-system';
import { theme } from '../../utils/theme/theme';
export const StyledButton = styled.button<LayoutProps & SpaceProps>`
  ${layout}
  ${space}
  background-color: ${theme.colors.purple};
  color: ${theme.colors.black};
  padding: 8px;
  font-size: ${theme.fontSizes.p2}px;
  font-weight: ${theme.fontWeights[4]};
  border: solid 2px ${theme.colors.black};
  border-radius: ${theme.radii.full};
  box-shadow: 3px 3px #282825;
  box-sizing: border-box;
  .middle {
    margin-right: 10px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }
  &:hover {
    cursor: pointer;
    transform: translateX(-4px) translateY(-4px);
    box-shadow: 7px 7px #282825;
  }

  &:disabled {
    opacity: 0.8;
    &:hover {
      cursor: auto;
      transform: translateX(0px) translateY(0px);
      box-shadow: 3px 3px #282825;
    }
  }

  transition-property: all;
  transition-timing-function: cubic-bezier(.4,0,.2,1);
  transition-duration: .15s;

  .loader {
    width: 20px;
    height: 20px;
    border: 2px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`
export const Button = ({submitting,...props}: PropsWithChildren & LayoutProps & SpaceProps & ButtonHTMLAttributes<HTMLButtonElement> & { submitting?: boolean }) => {
  return (
    <StyledButton {...props} disabled={submitting}
    >
      {submitting ? <span className="loader"></span> : props.children}
    </StyledButton>
  )
}
