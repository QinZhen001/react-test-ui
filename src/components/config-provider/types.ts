import type { Locale } from '../locale-provider/types';

export interface ConfigProviderProps {
  locale?: Locale;
  prefixCls?: string;
}

export interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
  legacyLocale: Locale;
}

export interface ConfigConsumerProps {
  locale?: Locale;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}
