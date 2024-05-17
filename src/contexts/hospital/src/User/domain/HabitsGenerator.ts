import { User } from './User';

export interface HabitsGenerator {
  generateHabits(user: User, physicInformation: any): Promise<{ habits?: { habit?: string; reason?: string }[] }>;
  saveHabitsKnowledgeBase(knowledgeBase: string): Promise<void>;
}
