import React, { useContext, createContext, useState } from 'react';
import { Meta } from '@storybook/react';
import { ConfigProvider } from './index';
import type { Locale } from '../locale-provider/types';

import zhCN from '../locale-provider/locale/zh_CN';
import enUS from '../locale-provider/locale/en_US';

console.log('zhCN', zhCN);
const meta: Meta = {
  title: 'Components/ConfigProvider',
  component: ConfigProvider,
};

type DocsProps = {};

export const Docs = () => {
  const [locale, setLocale] = useState<Locale>(zhCN);

  const switchLanguage = () => {
    if (locale === zhCN) {
      setLocale(enUS);
    } else {
      setLocale(zhCN);
    }
  };

  return (
    <div>
      <div>
        <button onClick={switchLanguage}>switchLanguage</button>
      </div>
      <ConfigProvider locale={locale}>
        <div>{locale.Text?.edit}</div>
      </ConfigProvider>
    </div>
  );
};

Docs.args = {};

export default meta;
