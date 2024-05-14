import { HabitsGenerator } from '../../domain/HabitsGenerator';
import { UserSearcher } from '../SearchUser/UserSearcher';

export class UserHabitsGenerator {
  constructor(
    private habitsGenerator: HabitsGenerator,
    private userSearcher: UserSearcher,
  ) {}

  async run(userId: string, physicInformation: any): Promise<string[]> {
    const user = await this.userSearcher.run(userId);
    const habits = await this.habitsGenerator.generateHabits(user, physicInformation);
    console.log(habits);
    return habits.habits.map((habit) => habit.habit + ' - ' + habit.reason);
  }
}
