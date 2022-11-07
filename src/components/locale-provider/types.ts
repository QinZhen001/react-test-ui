export interface Locale {
  locale: string;
  global?: Record<string, any>;
  Text?: {
    edit?: any;
    copy?: any;
    copied?: any;
    expand?: any;
  };
  Form?: {
    optional?: string;
    defaultValidateMessages?: string;
  };
}

export type LocaleComponentName = Exclude<keyof Locale, 'locale'>;

export interface LocaleReceiverProps<
  C extends LocaleComponentName = LocaleComponentName
> {
  componentName: C;
  defaultLocale?: Locale[C] | (() => Locale[C]);
  children: (
    locale: Locale[C],
    localeCode?: string,
    fullLocale?: object
  ) => React.ReactNode;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}
