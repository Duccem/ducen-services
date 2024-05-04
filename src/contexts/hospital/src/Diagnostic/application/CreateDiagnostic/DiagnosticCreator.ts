import { EventBus, Primitives } from '@ducen-services/shared';
import { Diagnostic } from '../../domain/Diagnostic';
import { DiagnosticRepository } from '../../domain/DiagnosticRepository';

export class DiagnosticCreator {
  constructor(
    private readonly repository: DiagnosticRepository,
    private readonly eventBus: EventBus,
  ) {}

  async run(data: Primitives<Diagnostic>) {
    const diagnostic = Diagnostic.Create(
      data.id,
      data.patientId,
      data.doctorId,
      data.appointmentId,
      data.description,
      data.code,
      data.status,
      data.type,
    );
    await this.repository.save(diagnostic);
    await this.eventBus.publish(diagnostic.pullDomainEvents());
  }
}
