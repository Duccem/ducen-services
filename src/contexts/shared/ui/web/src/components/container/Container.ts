import styled from 'styled-components';
import {
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
  border,
  color,
  flexbox,
  layout,
  shadow,
  space,
} from 'styled-system';
import { theme } from '../../utils/theme/theme';
export const Container = styled.div<ColorProps & BorderProps & SpaceProps & FlexboxProps & ShadowProps & LayoutProps>`
  display: flex;
  box-sizing: border-box;
  ${color}
  ${flexbox}
  ${space}
  ${border}
  ${shadow}
  ${layout}
`;
Container.defaultProps = {
  justifyContent: 'start',
  alignItems: 'start',
  flexDirection: 'row',
  marginX: theme.space[0],
  marginY: theme.space[0],
  paddingY: theme.space[2],
  paddingX: theme.space[2],
  width: '100%',
  height: '100%',
};
