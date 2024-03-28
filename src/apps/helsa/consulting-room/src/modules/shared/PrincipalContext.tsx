import { PropsWithChildren, createContext, useContext } from 'react';
import { ApolloClientProvider } from './ApolloProvider';
import { TranslateContextProvider } from './TranslateProvider';
import { SharedProvider } from './state/SharedProvider';
import { ErrorProvider } from './ErrorContext';

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
      <ErrorProvider>
        <TranslateContextProvider>
          <ApolloClientProvider>
            <SharedProvider>{children}</SharedProvider>
          </ApolloClientProvider>
        </TranslateContextProvider>
      </ErrorProvider>
    </PrincipalContext.Provider>
  );
}
export const usePrincipalContext = () => useContext(PrincipalContext);
