import React, { PropsWithChildren, createContext, useContext } from 'react';
import { ApolloClientProvider } from './ApolloProvider';
import { DatabaseConnectionProvider } from './DatabaseContext';
import { TranslateContextProvider } from './TranslateContext';
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

export function PrincipalContextProvider({ children, configurations }: PropsWithChildren<PrincipalContextState>) {
  return (
    <PrincipalContext.Provider value={{ configurations }}>
      <TranslateContextProvider>
        <DatabaseConnectionProvider>
          <ApolloClientProvider>
            <SharedProvider>{children}</SharedProvider>
          </ApolloClientProvider>
        </DatabaseConnectionProvider>
      </TranslateContextProvider>
    </PrincipalContext.Provider>
  );
}
export const usePrincipalContext = () => useContext(PrincipalContext);
