import { InternalError } from '../../domain/Errors/InternalError';
import { TaskHandler } from '../../domain/Task/TaskHandler';

export class TaskHandlers extends Map<string, TaskHandler> {
  constructor(taskHandlers: Array<TaskHandler>) {
    super();
    taskHandlers.forEach((taskHandler) => {
      this.set(taskHandler.subscribedTo(), taskHandler);
    });
  }

  public get(task: string): TaskHandler {
    const taskHandler = super.get(task);

    if (!taskHandler) {
      throw new InternalError(`The query <${task}> hasn't a query handler associated`);
    }

    return taskHandler;
  }

  public addTaskHandlers(taskHandlers: Array<TaskHandler>): void {
    taskHandlers.forEach((taskHandler) => {
      this.set(taskHandler.subscribedTo(), taskHandler);
    });
  }

  public addHandler(handler: TaskHandler): void {
    this.set(handler.subscribedTo(), handler);
  }
}
