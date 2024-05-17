import { User } from '../../../..';
import { HabitsGenerator } from '../../domain/HabitsGenerator';

export class UserHabitsGenerator {
  constructor(private habitsGenerator: HabitsGenerator) {}

  async run(user: User, physicInformation: any): Promise<{ habit?: string; reason?: string }[]> {
    const habits = await this.habitsGenerator.generateHabits(user, physicInformation);
    return habits.habits;
  }
}
