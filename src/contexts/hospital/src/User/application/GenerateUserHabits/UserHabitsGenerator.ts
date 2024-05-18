import { Criteria } from '@ducen-services/shared';
import { User } from '../../../..';
import { HabitsGenerator } from '../../domain/HabitsGenerator';

export class UserHabitsGenerator {
  constructor(private habitsGenerator: HabitsGenerator) {}

  async run(user: User, physicInformation: any): Promise<{ habit?: string; reason?: string }[]> {
    const habits = await this.habitsGenerator.generateHabits(
      user,
      physicInformation,
      Criteria.fromValues([{ field: 'version', operator: 'eq', value: 'v1' }]),
    );
    return habits.habits;
  }
}
