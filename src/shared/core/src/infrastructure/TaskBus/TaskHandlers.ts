import { Task, TaskHandler } from '../../domain/core/Task';
import { InternalError } from '../../domain/implementations/errors/InternalError';

export class TaskHandlers extends Map<Task, TaskHandler<Task>> {
  constructor(taskHandlers: Array<TaskHandler<Task>>) {
    super();
    taskHandlers.forEach((taskHandler) => {
      this.set(taskHandler.subscribedTo(), taskHandler);
    });
  }

  public get(task: Task): TaskHandler<Task> {
    const taskHandler = super.get(task);

    if (!taskHandler) {
      throw new InternalError(`The query <${task}> hasn't a query handler associated`);
    }

    return taskHandler;
  }

  public addTaskHandlers(taskHandlers: Array<TaskHandler<Task>>): void {
    taskHandlers.forEach((taskHandler) => {
      this.set(taskHandler.subscribedTo(), taskHandler);
    });
  }

  public addHandler(handler: TaskHandler<Task>): void {
    this.set(handler.subscribedTo(), handler);
  }
}
