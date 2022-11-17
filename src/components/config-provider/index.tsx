import React, { FC } from 'react';
import type { ConfigProviderProps, ConfigConsumerProps, ProviderChildrenProps } from './types';
import { LocaleReceiver, LocaleProvider } from '../locale-provider/index';
import { ConfigConsumer, ConfigContext } from './context';
import type { Locale } from '../locale-provider/types';

const DEFAULT_PREFIX_CLS = 'ag';

function getGlobalPrefixCls() {
  return DEFAULT_PREFIX_CLS;
}

const ProviderChildren: React.FC<ProviderChildrenProps> = (props) => {
  const { children, locale, legacyLocale, parentContext } = props;

  const getPrefixCls = React.useCallback(
    (suffixCls?: string, customizePrefixCls?: string) => {
      const { prefixCls } = props;
      if (customizePrefixCls) return customizePrefixCls;
      const mergedPrefixCls = prefixCls || DEFAULT_PREFIX_CLS;
      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    },
    [props.prefixCls]
  );

  const config = {
    ...parentContext,
    getPrefixCls,
    locale: locale || legacyLocale,
  };

  let childNode = children;

  if (locale) {
    childNode = <LocaleProvider locale={locale}>{childNode}</LocaleProvider>;
  }
  return <ConfigContext.Provider value={config}>{childNode}</ConfigContext.Provider>;
};

export const globalConfig = () => ({
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;
    return suffixCls ? `${getGlobalPrefixCls()}-${suffixCls}` : getGlobalPrefixCls();
  },
  getRootPrefixCls: (rootPrefixCls?: string, customizePrefixCls?: string) => {
    // Customize rootPrefixCls is first priority
    if (rootPrefixCls) {
      return rootPrefixCls;
    }

    // If Global prefixCls provided, use this
    if (DEFAULT_PREFIX_CLS) {
      return DEFAULT_PREFIX_CLS;
    }

    // [Legacy] If customize prefixCls provided, we cut it to get the prefixCls
    if (customizePrefixCls && customizePrefixCls.includes('-')) {
      return customizePrefixCls.replace(/^(.*)-[^-]*$/, '$1');
    }

    // Fallback to default prefixCls
    return getGlobalPrefixCls();
  },
});

export const ConfigProvider: FC<ConfigProviderProps> = (props) => {
  const { prefixCls } = props;
  const suffixCls = props.locale?.locale;
  const className = prefixCls ? `${prefixCls}-${suffixCls}` : suffixCls;

  return (
    <LocaleReceiver>
      {(_, __, legacyLocale) => (
        <div className={className}>
          <ConfigConsumer>
            {(context) => <ProviderChildren parentContext={context} legacyLocale={legacyLocale as Locale} {...props} />}
          </ConfigConsumer>
        </div>
      )}
    </LocaleReceiver>
  );
};
