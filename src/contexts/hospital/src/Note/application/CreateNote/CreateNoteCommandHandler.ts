import { Command, CommandHandler } from '@ducen-services/shared';
import { DoctorSearcher } from '../../../Doctor/application/SearchDoctor/DoctorSearcher';
import { DoctorRepository } from '../../../Doctor/domain/DoctorRepository';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { UserSearcher } from '../../../User/application/SearchUser/UserSearcher';
import { UserRepository } from '../../../User/domain/UserRepository';
import { NoteRepository } from '../../domain/NoteRepository';
import { CreateNoteCommand } from './CreateNoteCommand';
import { NoteCreator } from './NoteCreator';

export class CreateNoteCommandHandler implements CommandHandler<CreateNoteCommand> {
  private creator: NoteCreator;
  constructor(
    noteRepository: NoteRepository,
    doctorRepository: DoctorRepository,
    patientRepository: PatientRepository,
    userRepository: UserRepository,
  ) {
    this.creator = new NoteCreator(
      noteRepository,
      new DoctorSearcher(doctorRepository),
      new PatientSearcher(patientRepository),
      new UserSearcher(userRepository),
    );
  }

  subscribedTo(): Command {
    return CreateNoteCommand;
  }

  public async handle(command: CreateNoteCommand): Promise<void> {
    await this.creator.run(command.note);
  }
}
