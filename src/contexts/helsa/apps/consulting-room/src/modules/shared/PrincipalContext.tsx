import { theme } from '@shared/ui-web';
import { PropsWithChildren, createContext, useContext } from 'react';
import { ThemeProvider } from 'styled-components';
import { ApolloClientProvider } from './ApolloProvider';
import { TranslateContextProvider } from './TranslateProvider';
import { SharedProvider } from './state/SharedProvider';

export interface Configurations {
  baseUrl: string;
  citiesUrl: string;
  countriesUrl: string;
}

export interface PrincipalContextState {
  configurations?: Configurations;
}
export const PrincipalContext = createContext<PrincipalContextState>({} as PrincipalContextState);

export function PrincipalContextProvider({ children, configurations  }: PropsWithChildren<PrincipalContextState>) {
  return (
    <PrincipalContext.Provider value={{configurations}}>
      <ThemeProvider theme={theme}>
        <TranslateContextProvider>
          <ApolloClientProvider>
            <SharedProvider>
              {children}
            </SharedProvider>
          </ApolloClientProvider>
        </TranslateContextProvider>
      </ThemeProvider>
    </PrincipalContext.Provider>
  );
}
export const usePrincipalContext = () => useContext(PrincipalContext);
