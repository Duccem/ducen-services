import { Command } from '@ducen-services/shared';

export class CreatePatientCommand extends Command {
  constructor(
    public id: string,
    public userId: string,
  ) {
    super();
  }
}
