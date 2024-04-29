import { IdentifyBy } from '../../../User/domain/IdentifyBy';
import { UserNotExist } from '../../../User/domain/UserNotExist';
import { UserRepository } from '../../../User/domain/UserRepository';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { Notifier } from '../../domain/Notifier';

export class Notify {
  constructor(
    private readonly repository: NotificationRepository,
    private readonly userRepository: UserRepository,
    private readonly notifiers: Notifier[],
  ) {}

  async execute(request: {
    userId: string;
    title: string;
    body: string;
    types: string[];
    data: { [key: string]: any };
  }): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('id', request.userId));
    if (!user) {
      throw new UserNotExist();
    }
    const notification = Notification.Create(request.userId, request.title, request.body, request.types, request.data);
    const template = await this.repository.getTemplate(request.body);
    if (template) {
      notification.setTemplate(template);
    }
    await this.repository.save(notification);
    const notifiers = this.notifiers.filter((notifier) => request.types.includes(notifier.type));
    await Promise.all(notifiers.map((notifier) => notifier.notify(notification, user, request.data)));
  }
}
