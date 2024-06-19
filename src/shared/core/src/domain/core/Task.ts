export abstract class Task {
  static TASK_TIME: string;
}
export interface TaskHandler<T extends Task> {
  subscribedTo(): Task;
  handle(task: T): Promise<void>;
}
export interface TaskBus {
  run(task: string): Promise<void>;
  addTaskHandlers(queryHandlers: Array<TaskHandler<Task>>): void;
  addHandler(handler: TaskHandler<Task>): void;
}
