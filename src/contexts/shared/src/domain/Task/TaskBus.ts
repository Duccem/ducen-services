import { Task } from './Task';
import { TaskHandler } from './TaskHandler';

export interface TaskBus {
  ask<T>(task: Task): Promise<T>;
  addTaskHandlers(queryHandlers: Array<TaskHandler<Task>>): void;
  addHandler(handler: TaskHandler<Task>): void;
}
