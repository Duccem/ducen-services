import { Command, CommandHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { LabResultRepository } from '../../domain/LabResultRepository';
import { CreateResultCommand } from './CreateResultCommand';
import { ResultCreator } from './ResultCreator';

export class CreateResultCommandHandler implements CommandHandler<CreateResultCommand> {
  private creator: ResultCreator;
  constructor(repository: LabResultRepository, patientRepository: PatientRepository) {
    this.creator = new ResultCreator(repository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Command {
    return CreateResultCommand;
  }

  public async handle(command: CreateResultCommand): Promise<void> {
    await this.creator.run(command.result);
  }
}
