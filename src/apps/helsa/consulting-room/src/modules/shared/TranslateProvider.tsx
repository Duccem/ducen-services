import { createContext, useState } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en from '../../assets/locales/en.json';
import messages_es from '../../assets/locales/es.json';
const messages = {
  es: messages_es,
  en: messages_en,
};
export interface TranslateContextProps {
  locale: string;
  setLocale: (locale: string) => void;
}

export const TranslateContext = createContext<TranslateContextProps>({} as TranslateContextProps);
export const TranslateContextProvider = ({ children }) => {
  const [locale, setLocale] = useState('es');
  const value = {
    locale,
    setLocale,
  };
  return (
    <TranslateContext.Provider value={value}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </TranslateContext.Provider>
  );
};
