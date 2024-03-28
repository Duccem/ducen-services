import { createContext, useContext } from "react";
import { SharedStoreActions, useSharedStore } from "./SharedStore";

export const SharedContext = createContext<SharedStoreActions>({} as SharedStoreActions);

export const SharedProvider = ({ children }) => {
  const state = useSharedStore();
  return (
    <SharedContext.Provider value={state}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => useContext(SharedContext);
