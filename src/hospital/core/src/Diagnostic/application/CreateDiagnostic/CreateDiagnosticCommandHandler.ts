import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { DiagnosticRepository } from '../../domain/DiagnosticRepository';
import { CreateDiagnosticCommand } from './CreateDiagnosticCommand';
import { DiagnosticCreator } from './DiagnosticCreator';

export class CreateDiagnosticCommandHandler implements CommandHandler<CreateDiagnosticCommand> {
  private creator: DiagnosticCreator;
  constructor(repository: DiagnosticRepository, eventBus: EventBus) {
    this.creator = new DiagnosticCreator(repository, eventBus);
  }

  subscribedTo(): Command {
    return CreateDiagnosticCommand;
  }

  public async handle(command: CreateDiagnosticCommand): Promise<void> {
    await this.creator.run(command.data);
  }
}
