import { User, UserClientRepository } from '@helsa/modules';
import { Uuid } from '@ducen/core';
import { useSharedContext } from '../../shared/state/SharedProvider';
import { UserStoreActions } from './UserStore';

export function useUserService(
  { setUser, userState, setPartialUser }: UserStoreActions,
  userRepository: UserClientRepository
) {
  const { setToken } = useSharedContext();
  return {
    login: async (email: string, password: string) => {
      const response = await userRepository.login(email, password);
      if (response) {
        setUser(response.user.toPrimitives());
        setToken(response.token);
      }
    },
    register: async () => {
      const saveUser = { ...userState.user, id: Uuid.random().toString(), photo: 'image.jpg' };
      await userRepository.create(User.fromPrimitives(saveUser));
      setPartialUser({ ...saveUser, password: '' });
    },
    recoveryPassword: async (email: string) => {
      await userRepository.recoveryPassword(email);
    },
    changePassword: async (userId: string, password: string, oldPassword: string) => {
      await userRepository.changePassword(userId, password, oldPassword);
    },
  };
}

export type UserServices = ReturnType<typeof useUserService>;
