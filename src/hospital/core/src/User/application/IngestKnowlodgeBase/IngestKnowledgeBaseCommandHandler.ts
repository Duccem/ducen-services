import { Command, CommandHandler } from '@ducen/shared';
import { HabitsGenerator } from '../../domain/HabitsGenerator';
import { IngestKnowledgeBaseCommand } from './IngestKnowledgeBaseCommand';
import { Ingester } from './Ingester';

export class IngestKnowledgeBaseCommandHandler implements CommandHandler<IngestKnowledgeBaseCommand> {
  private ingester: Ingester;
  constructor(habitsGenerator: HabitsGenerator) {
    this.ingester = new Ingester(habitsGenerator);
  }

  subscribedTo(): Command {
    return IngestKnowledgeBaseCommand;
  }

  public async handle(command: IngestKnowledgeBaseCommand): Promise<void> {
    await this.ingester.run(command.knowledgeBase);
  }
}
