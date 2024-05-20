import { Task } from './Task';
export interface TaskHandler<T extends Task> {
  subscribedTo(): Task;
  handle(query: T): Promise<any>;
}
