import { UserSearcher } from '../../../User/application/UserSearcher/UserSearcher';
import { UserNotExist } from '../../../User/domain/UserNotExist';
import { Patient } from '../../domain/Patient';
import { PatientRepository } from '../../domain/PatientRepository';

export class PatientCreator {
  constructor(
    private repository: PatientRepository,
    private userSearcher: UserSearcher,
  ) {}

  async run(id: string, userId: string): Promise<void> {
    const user = await this.userSearcher.run('id', userId);
    if (!user) {
      throw new UserNotExist();
    }
    const patient = Patient.Create(id, userId);
    await this.repository.save(patient);
  }
}
