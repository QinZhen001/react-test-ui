import React, { useContext, createContext } from 'react';
import { Meta } from '@storybook/react';
import { LocaleReceiver } from './index';

const meta: Meta = {
  title: 'Components/LocaleReceiver',
  component: LocaleReceiver,
};

type DocsProps = {};

export const Docs = () => {
  const getDefaultLocale = () => {
    return {
      edit: 'edit1111',
    };
  };

  return (
    <div>
      {/* defaultLocale={getDefaultLocale} */}
      <LocaleReceiver componentName="Text">
        {(locale, localeCode, fullLocale) => {
          console.log('locale', locale);
          console.log('localeCode', localeCode);
          console.log('fullLocale', fullLocale);
          return <div>{locale?.edit}</div>;
        }}
      </LocaleReceiver>
    </div>
  );
};

Docs.args = {};

export default meta;
