export interface TaskHandler {
  subscribedTo(): string;
  handle(): Promise<void>;
}
