import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { createContext, useContext, useState } from "react";
import * as en from '../../../assets/locales/en.json';
import * as es from '../../../assets/locales/es.json';
const translations = {es, en}

export interface TranslateContextProps {
  translator: I18n,
  locale: string,
  setLocale: (locale: string) => void
}

export const TranslateContext = createContext<TranslateContextProps>({} as TranslateContextProps);

export const TranslateContextProvider = ({ children }: any) => {
  const i18n = new I18n(translations)
  const [locale, setLocale] = useState(Localization.locale);
  i18n.locale = locale
  i18n.enableFallback = true;
  i18n.defaultLocale = 'es';
  return (
    <TranslateContext.Provider value={{
      translator: i18n,
      locale,
      setLocale
    }}>
      {children}
    </TranslateContext.Provider>
  );
}

export const useTranslateContext = () => useContext(TranslateContext);
