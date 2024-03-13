import styled from 'styled-components';
import { theme } from '../../utils/theme/theme';

export const StyledSocialButton = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  border: 2px solid #282825;
  background-color: ${theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px #282825;
  .image,
  svg {
    height: 20px;
    width: 20px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: 4px 4px #282825;
    transform: translateX(-2px) translateY(-2px);
  }
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.15s;
`;
