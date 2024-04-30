import { Primitives } from '@ducen-services/shared';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class CreateFlag {
  constructor(
    public readonly flagRepository: FlagRepository,
    private readonly cacheRepository: FlagRepository,
  ) {}

  async create(flag: Primitives<Flag>) {
    const existingFlag = this.flagRepository.getFlag(flag.name);
    if (existingFlag) {
      throw new Error('Flag already exists');
    }
    const newFlag = Flag.create(flag.id, flag.name, flag.attributes, flag.handlers, flag.enabled);
    await this.flagRepository.create(newFlag);
    await this.cacheRepository.create(newFlag);
  }
}
