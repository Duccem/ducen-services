import { Command, CommandHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { VaccineRepository } from '../../domain/VaccineRepository';
import { CreateVaccineCommand } from './CreateVaccineCommand';
import { VaccineCreator } from './VaccineCreator';

export class CreateVaccineCommandHandler implements CommandHandler<CreateVaccineCommand> {
  private creator: VaccineCreator;
  constructor(vaccineRepository: VaccineRepository, patientRepository: PatientRepository) {
    this.creator = new VaccineCreator(vaccineRepository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Command {
    return CreateVaccineCommand;
  }

  public async handle(command: CreateVaccineCommand): Promise<void> {
    await this.creator.run(command.data);
  }
}
