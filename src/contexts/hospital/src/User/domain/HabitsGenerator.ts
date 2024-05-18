import { Criteria } from '@ducen-services/shared';
import { User } from './User';

export interface HabitsGenerator {
  generateHabits(
    user: User,
    physicInformation: any,
    criteria: Criteria,
  ): Promise<{ habits?: { habit?: string; reason?: string }[] }>;
  saveHabitsKnowledgeBase(knowledgeBase: string): Promise<void>;
}
