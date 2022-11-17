import React, { FC } from 'react';
import LocaleContext from './context';
// english as default
import defaultLocaleData from './locale/en_US';
import type {
  Locale,
  LocaleComponentName,
  LocaleReceiverProps,
  LocaleProviderProps,
} from './types';
import type { LocaleContextProps } from './context';

export const LocaleReceiver = <
  C extends LocaleComponentName = LocaleComponentName
>(
  props: LocaleReceiverProps<C>
) => {
  const { componentName = 'global' as C, defaultLocale, children } = props;
  const antLocale = React.useContext<LocaleContextProps | undefined>(
    LocaleContext
  );

  const getLocale = React.useMemo<NonNullable<Locale[C]>>(() => {
    const locale = defaultLocale || defaultLocaleData[componentName];
    const localeFromContext = antLocale?.[componentName] ?? {};
    return {
      ...(locale instanceof Function ? locale() : locale),
      ...(localeFromContext || {}),
    } as NonNullable<Locale[C]>;
  }, [componentName, defaultLocale, antLocale]);

  const getLocaleCode = React.useMemo<string>(() => {
    const localeCode = antLocale && antLocale.locale;
    // Had use LocaleProvide but didn't set locale
    if (antLocale && antLocale.exist && !localeCode) {
      return defaultLocaleData.locale;
    }
    return localeCode!;
  }, [antLocale]);

  return children(getLocale, getLocaleCode, antLocale!);
};

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
