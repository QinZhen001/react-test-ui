import React from 'react';
import { ConfigProvider as AntiConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
// import type {  } from 'antd';

const theme: ConfigProviderProps['theme'] = {
  token: {
    colorPrimary: '#099DFD',
    colorSuccess: '#06C633',
    colorWarning: '#FAAD15',
    colorError: '#FD3636',
    colorInfo: '#099DFD',
    colorTextBase: '#586376',
    // colorBgBase: '',
    // fontFamily: string;
    // fontSize: number;
    // borderRadius
  },
  // components: {
  //   Button: {},
  // },
};

export const ConfigProvider = (props: ConfigProviderProps) => {
  props = { ...props, theme };
  return <AntiConfigProvider {...props} />;
};
