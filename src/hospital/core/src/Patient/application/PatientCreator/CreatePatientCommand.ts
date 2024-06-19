import { Command } from '@ducen/shared';

export class CreatePatientCommand extends Command {
  constructor(public id: string, public userId: string) {
    super();
  }
}
