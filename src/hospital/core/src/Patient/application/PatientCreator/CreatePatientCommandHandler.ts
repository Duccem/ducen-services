import { Command, CommandHandler } from '@ducen/shared';
import { UserSearcher } from '../../../User/application/SearchUser/UserSearcher';
import { UserRepository } from '../../../User/domain/UserRepository';
import { PatientRepository } from '../../domain/PatientRepository';
import { CreatePatientCommand } from './CreatePatientCommand';
import { PatientCreator } from './PatientCreator';

export class CreatePatientCommandHandler implements CommandHandler<CreatePatientCommand> {
  private creator: PatientCreator;
  constructor(patientRepository: PatientRepository, userRepository: UserRepository) {
    this.creator = new PatientCreator(patientRepository, new UserSearcher(userRepository));
  }

  subscribedTo(): Command {
    return CreatePatientCommand;
  }

  public async handle(command: CreatePatientCommand): Promise<void> {
    await this.creator.run(command.id, command.userId);
  }
}
