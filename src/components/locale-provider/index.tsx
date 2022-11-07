import React from 'react';
import LocaleContext from './context';
import defaultLocaleData from './locale/en_US';

import type {
  Locale,
  LocaleComponentName,
  LocaleReceiverProps,
  LocaleProviderProps,
} from './types';
import type { LocaleContextProps } from './context';

export class LocaleReceiver<
  C extends LocaleComponentName = LocaleComponentName
> extends React.Component<LocaleReceiverProps<C>> {
  static defaultProps = {
    componentName: 'global',
  };

  static contextType = LocaleContext;

  // declare context: React.ContextType<typeof MyContext>;

  // context = LocaleContext;

  constructor(props: LocaleReceiverProps<C>) {
    super(props);
    this.context = LocaleContext;
  }

  getLocale(): Locale[C] {
    const { componentName, defaultLocale } = this.props;
    const locale =
      defaultLocale || defaultLocaleData[componentName ?? 'global'];
    const antLocale = this.context;
    const localeFromContext =
      componentName && antLocale ? antLocale[componentName] : {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    };
  }

  getLocaleCode() {
    const antLocale = this.context;
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode;
  }

  render() {
    return this.props.children(
      this.getLocale(),
      this.getLocaleCode(),
      this.context
    );
  }
}

export function useLocaleReceiver<T extends LocaleComponentName>(
  componentName: T,
  defaultLocale?: Locale[T] | Function
): [Locale[T]] {
  const antLocale = React.useContext(LocaleContext);

  const componentLocale = React.useMemo(() => {
    const locale =
      defaultLocale || defaultLocaleData[componentName || 'global'];
    const localeFromContext =
      componentName && antLocale ? antLocale[componentName] : {};

    return {
      ...(typeof locale === 'function' ? (locale as Function)() : locale),
      ...(localeFromContext || {}),
    };
  }, [componentName, defaultLocale, antLocale]);

  return [componentLocale];
}

export class LocaleProvider extends React.Component<LocaleProviderProps, any> {
  constructor(props: LocaleProviderProps) {
    super(props);
    // changeConfirmLocale(props.locale && props.locale.Modal);
  }

  render() {
    const { locale, children } = this.props;
    return (
      <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
    );
  }
}
