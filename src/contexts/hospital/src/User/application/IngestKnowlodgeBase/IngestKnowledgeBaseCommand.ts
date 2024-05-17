import { Command } from '@ducen-services/shared';

export class IngestKnowledgeBaseCommand extends Command {
  constructor(public readonly knowledgeBase: string) {
    super();
  }
}
