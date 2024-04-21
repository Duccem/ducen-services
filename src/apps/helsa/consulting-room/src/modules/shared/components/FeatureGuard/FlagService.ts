import { FlagClientRepository } from '@helsa/modules';

export function useFlagService(repository: FlagClientRepository) {
  return {
    getFlags: async () => {
      return await repository.getFlags();
    },
    createFlag: async (flag: any) => {
      await repository.createFlag(flag);
    },
  };
}

export type FlagServices = ReturnType<typeof useFlagService>;
