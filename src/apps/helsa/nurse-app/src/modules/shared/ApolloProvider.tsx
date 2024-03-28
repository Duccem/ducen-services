import { ApolloClient, DefaultOptions, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { createContext, useContext } from "react";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};



export interface ApolloClientProps {
  client: ApolloClient<NormalizedCacheObject>;
}

const ApolloContext = createContext<ApolloClientProps>({} as ApolloClientProps);

export const ApolloClientProvider = ({ children }) => {
  const client = new ApolloClient({
    uri: 'https://rs28wkcq-3000.use2.devtunnels.ms/api/graphql',
    cache: new InMemoryCache(),
    defaultOptions,
  });
  return (
    <ApolloContext.Provider value={{ client }} >
      {children}
    </ApolloContext.Provider>
  );
}

export const useApolloContext = () => useContext(ApolloContext);
