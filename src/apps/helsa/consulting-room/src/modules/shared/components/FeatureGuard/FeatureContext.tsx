import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useApolloContext } from "../../ApolloProvider";
import { useFlagService } from "./FlagService";
import { ApolloFlagRepository } from "@helsa/modules";
type Feature = {
  name: string;
  enabled: boolean;
};
const FeatureContext = createContext<Feature[]>([]);
export const FeatureProvider = ({ children }: PropsWithChildren) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const { client } = useApolloContext();
  const { getFlags } = useFlagService(
    new ApolloFlagRepository(client)
  );

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await getFlags();
        setFeatures(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <FeatureContext.Provider value={features}>
      {children}
    </FeatureContext.Provider>
  );
}

export const useFeatureContext = () => useContext(FeatureContext);
