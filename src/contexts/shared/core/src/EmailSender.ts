export abstract class EmailSender {
  public abstract SendEmail(userId: string, title: string, templateName: string, data?: unknown): Promise<void>;
}
