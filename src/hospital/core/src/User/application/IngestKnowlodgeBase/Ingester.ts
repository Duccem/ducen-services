import { HabitsGenerator } from '../../domain/HabitsGenerator';

export class Ingester {
  constructor(private readonly habitsGenerator: HabitsGenerator) {}
  async run(knowledgeBase: string): Promise<void> {
    await this.habitsGenerator.saveHabitsKnowledgeBase(knowledgeBase);
  }
}
