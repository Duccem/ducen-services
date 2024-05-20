import { TaskHandler } from './TaskHandler';

export interface TaskBus {
  run(task: string): Promise<void>;
  addTaskHandlers(queryHandlers: Array<TaskHandler>): void;
  addHandler(handler: TaskHandler): void;
}
