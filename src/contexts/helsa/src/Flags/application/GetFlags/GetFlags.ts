import { IdentifyBy } from '../../../User/domain/IdentifyBy';
import { UserNotExist } from '../../../User/domain/UserNotExist';
import { UserRepository } from '../../../User/domain/UserRepository';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class GetFlags {
  constructor(
    private readonly flagRepository: FlagRepository,
    protected readonly userRepository: UserRepository,
  ) {}
  async run(id: string): Promise<any[]> {
    const flags = await this.flagRepository.list();
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('id', id));
    if (!user) throw new UserNotExist();
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
