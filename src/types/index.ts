import { CSSProperties } from 'react';

export interface BaseProps {
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
}

export type SizeType = 'small' | 'middle' | 'large' | undefined;
