import { UserSearcher } from '../../../User/application/SearchUser/UserSearcher';
import { UserNotExist } from '../../../User/domain/UserNotExist';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class GetFlags {
  constructor(
    private readonly flagRepository: FlagRepository,
    private readonly cacheRepository: FlagRepository,
    private readonly userSearcher: UserSearcher,
  ) {}
  async run(id: string): Promise<any[]> {
    const user = await this.userSearcher.run(id);
    if (!user) throw new UserNotExist();
    let flags = await this.cacheRepository.list();
    if (!flags.length) {
      flags = await this.flagRepository.list();
    }
    const response = flags.map((flag: Flag) => {
      const enabled = flag.isEnabled(user);
      return {
        enabled,
        name: flag.name.value,
      };
    });
    return response;
  }
}
