import React, { FC } from 'react';
import type {
  ConfigProviderProps,
  ConfigConsumerProps,
  ProviderChildrenProps,
} from './types';
import { LocaleReceiver, LocaleProvider } from '../locale-provider/index';
import defaultLocale from '../locale-provider/locale/en_US';
import { ConfigConsumer, ConfigContext } from './context';
import type { Locale } from '../locale-provider/types';

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  const { children, locale, legacyLocale, parentContext } = props;

  const config = {
    ...parentContext,
    locale: locale || legacyLocale,
  };

  let childNode = children;

  if (locale) {
    childNode = <LocaleProvider locale={locale}>{childNode}</LocaleProvider>;
  }
  return (
    <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>
  );
};

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  return (
    <LocaleReceiver>
      {(_, __, legacyLocale) => (
        <ConfigConsumer>
          {(context) => (
            <ProviderChildren
              parentContext={context}
              legacyLocale={legacyLocale as Locale}
              {...props}
            />
          )}
        </ConfigConsumer>
      )}
    </LocaleReceiver>
  );
};
