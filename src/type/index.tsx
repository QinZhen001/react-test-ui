import { CSSProperties } from 'react';

export interface BaseProps {
  style?: CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
}
