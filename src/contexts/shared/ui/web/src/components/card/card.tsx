
import styled from "styled-components";
import { SpaceProps, LayoutProps, layout, space } from "styled-system";

export const Card = styled.div<LayoutProps & SpaceProps>`
  border: 2px solid ${props => props.theme.colors.black};
  padding: ${props => props.theme.space[2]}px;
  min-height: ${props => props.theme.sizes.fixed.small};
  min-width: ${props => props.theme.sizes.fixed.small};
  box-shadow: 3px 3px ${props => props.theme.colors.dark_gray};
  border-radius:  ${props => props.theme.radii.medium};
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
  ${layout}
  ${space}
`
