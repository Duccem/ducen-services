import styled from 'styled-components';
import { LayoutProps, SpaceProps, layout, space } from 'styled-system';

export const StyledForm = styled.form<LayoutProps & SpaceProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.25rem;
  ${layout}
  ${space}
`;
