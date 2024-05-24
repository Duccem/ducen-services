import { Logger, MongoConnection, MongoRepository } from '@ducen-services/shared';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { TemplateRepository } from '../../domain/TemplateRepository';

export class MongoNotificationRepository extends MongoRepository<Notification> implements NotificationRepository {
  private templateRepository: TemplateRepository;
  constructor(connection: MongoConnection, logger: Logger) {
    super(Notification, connection, logger);
  }

  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 }, { unique: true });
  }
  public async save(notification: Notification): Promise<void> {
    await this.persist(notification.id.toString(), notification);
  }
  public async getTemplate(name: string): Promise<any> {
    return null;
  }
}
