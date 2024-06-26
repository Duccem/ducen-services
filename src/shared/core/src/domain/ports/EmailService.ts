export interface EmailService {
  sendEmail(to: string, subject: string, template: string, data: { [key: string]: any }): Promise<void>;
}
