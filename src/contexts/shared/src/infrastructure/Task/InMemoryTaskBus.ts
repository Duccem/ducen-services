import { Task, TaskBus, TaskHandler } from '../../domain/core/Task';
import { TaskHandlers } from './TaskHandlers';

export class InMemoryTaskBus implements TaskBus {
  constructor(private taskHandlersInformation: TaskHandlers) {}

  async run(task: Task): Promise<void> {
    const handler = this.taskHandlersInformation.get(task);
    await handler.handle(task);
  }
  public addTaskHandlers(taskHandlers: Array<TaskHandler<Task>>): void {
    this.taskHandlersInformation.addTaskHandlers(taskHandlers);
  }

  public addHandler(handler: TaskHandler<Task>): void {
    this.taskHandlersInformation.addHandler(handler);
  }
}
