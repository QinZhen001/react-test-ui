import React, { useContext, createContext, useState } from 'react';
import { Meta } from '@storybook/react';
import { ConfigProvider } from './index';
import { ConfigContext } from './context';
import type { Locale } from '../locale-provider/types';

import zhCN from '../locale-provider/locale/zh_CN';
import enUS from '../locale-provider/locale/en_US';

console.log('zhCN', zhCN);

const meta: Meta = {
  title: 'Components/ConfigProvider',
  component: ConfigProvider,
};

type DocsProps = {
  // prefixCls: string;
};

export const Docs = ({ prefixCls }) => {
  const [locale, setLocale] = useState<Locale>(zhCN);

  const switchLanguage = () => {
    if (locale === zhCN) {
      setLocale(enUS);
    } else {
      setLocale(zhCN);
    }
  };

  const Child = () => {
    const context = useContext(ConfigContext);
    console.log('context', context);

    return (
      <div>
        <div>{locale.Text?.edit}</div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button onClick={switchLanguage}>switchLanguage</button>
      </div>
      <ConfigProvider locale={locale} prefixCls={prefixCls}>
        <Child></Child>
      </ConfigProvider>
    </div>
  );
};

Docs.args = {
  // prefixCls 需要和less中的theme变量保持一致
  prefixCls: 'ag',
};

export default meta;
