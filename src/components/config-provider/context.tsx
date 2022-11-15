import React from 'react';
import { ConfigConsumerProps } from './types';
import { SizeType } from '../../types/index';

const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string
) => {
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `ag-${suffixCls}` : 'ag';
};

export const ConfigContext = React.createContext<ConfigConsumerProps>({
  // We provide a default function for Context without provider
  getPrefixCls: defaultGetPrefixCls,
});

export const ConfigConsumer = ConfigContext.Consumer;

export const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({
  children,
  size,
}) => (
  <SizeContext.Consumer>
    {(originSize) => (
      <SizeContext.Provider value={size || originSize}>
        {children}
      </SizeContext.Provider>
    )}
  </SizeContext.Consumer>
);

export default SizeContext;
