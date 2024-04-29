import { Template } from './Template';

export interface TemplateRepository {
  getTemplate(name: string): Promise<Template>;
}
