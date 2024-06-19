import { Command, CommandHandler } from '@ducen/shared';
import { TreatmentRepository } from '../../domain/TreatmentRepository';
import { CreateTreatmentCommand } from './CreateTreatmentCommand';
import { TreatmentCreator } from './TreatmentCreator';

export class CreateTreatmentCommandHandler implements CommandHandler<CreateTreatmentCommand> {
  private creator: TreatmentCreator;
  constructor(repository: TreatmentRepository) {
    this.creator = new TreatmentCreator(repository);
  }

  subscribedTo(): Command {
    return CreateTreatmentCommand;
  }

  public async handle(command: CreateTreatmentCommand): Promise<void> {
    await this.creator.run(command.data);
  }
}
