import { Command } from '@ducen/shared';

export class IngestKnowledgeBaseCommand extends Command {
  constructor(public readonly knowledgeBase: string) {
    super();
  }
}
