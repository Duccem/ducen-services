import { TaskBus } from '../../domain/Task/TaskBus';
import { TaskHandler } from '../../domain/Task/TaskHandler';
import { TaskHandlers } from './TaskHandlers';

export class InMemoryTaskBus implements TaskBus {
  constructor(private taskHandlersInformation: TaskHandlers) {}

  async run(task: string): Promise<void> {
    const handler = this.taskHandlersInformation.get(task);
    await handler.handle(task);
  }
  public addTaskHandlers(taskHandlers: Array<TaskHandler>): void {
    this.taskHandlersInformation.addTaskHandlers(taskHandlers);
  }

  public addHandler(handler: TaskHandler): void {
    this.taskHandlersInformation.addHandler(handler);
  }
}
