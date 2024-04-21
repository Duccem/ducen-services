import { Primitives } from '@ducen/core';
import { Flag } from '../../domain/Flag';
import { FlagRepository } from '../../domain/FlagRepository';

export class CreateFlag {
  constructor(public readonly flagRepository: FlagRepository) {}

  create(flag: Primitives<Flag>) {
    const existingFlag = this.flagRepository.getFlag(flag.name);
    if (existingFlag) {
      throw new Error('Flag already exists');
    }
    const newFlag = Flag.create(flag.id, flag.name, flag.attributes, flag.handlers, flag.enabled);
    return this.flagRepository.create(newFlag);
  }
}
