import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { InputHTMLAttributes, PropsWithChildren } from 'react';
import { LayoutProps, SpaceProps } from 'styled-system';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;
export type BaseProps = PropsWithChildren<{ placeholder?: string; error?: string; icon?: IconDefinition; iconAction?: () => void; id?: string }> &
  LayoutProps &
  SpaceProps;
export type StyledTypes = LayoutProps & SpaceProps;

export type AcceptFile = 'images/*' | 'audio/*' | 'video/*' | '.pdf' | '.doc,.docx' | '.xlsx' | '.xml';
export type FileProps = { onChange?: (value: string) => void; accept?: AcceptFile };
export type SelectProps = { onChange?: (value: string) => void; options?: { icon: any; label: string; value: string }[]; autocomplete?: boolean };

export type AllProps = InputProps & StyledTypes & FileProps;
