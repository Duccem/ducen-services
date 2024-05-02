import { Command, CommandHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { SurgeryRepository } from '../../domain/SurgeryRepository';
import { CreateSurgeryCommand } from './CreateSurgeryCommand';
import { SurgeryCreator } from './SurgeryCreator';

export class CreateSurgeryCommandHandler implements CommandHandler<CreateSurgeryCommand> {
  private creator: SurgeryCreator;
  constructor(surgeryRepository: SurgeryRepository, patientRepository: PatientRepository) {
    this.creator = new SurgeryCreator(surgeryRepository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Command {
    return CreateSurgeryCommand;
  }

  public async handle(command: CreateSurgeryCommand): Promise<void> {
    await this.creator.run(command.surgery);
  }
}
