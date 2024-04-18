import { ApolloUserRepository } from "@helsa/modules";
import { PropsWithChildren, createContext, useContext } from "react";
import { useApolloContext } from "../../shared/ApolloProvider";
import { UserServices, useUserService } from "./UserService";
import { UserStoreActions, useUserStore } from "./UserStore";


export const UserStoreContext = createContext<UserStoreActions & UserServices>({} as UserStoreActions & UserServices);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const { client } = useApolloContext();
  const repository = new ApolloUserRepository(client);
  const state = useUserStore();
  const services = useUserService(state, repository);
  return (
    <UserStoreContext.Provider value={{...state, ...services}}>
        {children}
    </UserStoreContext.Provider>
  )
}

export const useUserContext = () => useContext(UserStoreContext);
