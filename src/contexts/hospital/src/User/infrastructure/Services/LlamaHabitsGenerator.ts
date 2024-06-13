import { LlamaGenerator, MongoConnection, OllamaConfig } from '@ducen-services/shared';
import { z } from 'zod';
import { User } from '../../../..';
import { HabitsGenerator } from '../../domain/HabitsGenerator';
export class LlamaHabitsGenerator extends LlamaGenerator implements HabitsGenerator {
  static SYSTEM_TEMPLATE = `
    * Actúa como un profesional de la salud con años de experiencia en el campo de la salud mental y física, tratando con pacientes de todas las edades y condiciones, y con un enfoque en la prevención y el bienestar general
    * Solo debes recomendar hábitos saludables en formato JSON
    * Devuelve únicamente el listado de 3 hábitos recomendados
    * Añade también el motivo de la sugerencia (IMPORTANTE: Ha de ser en castellano)
    * Ejemplo de respuesta de la razón de la sugerencia: "Porque tiene un peso superior a 102kg necesita hacer cardio".
    * Utiliza el formato JSON para devolver la respuesta
    * Basa tu respuesta en los datos físicos del paciente
    * Usa como referencia la siguiente informacion: {context}
    * Si no puedes recomendar ningún hábito, responde con una lista vacía
      {format_instructions}
    * Los datos físicos del paciente son: {query}`;
  static RESPONSE_STRUCTURE = z.object({
    habits: z.array(
      z.object({
        habit: z.string(),
        reason: z.string(),
      }),
    ),
  });
  constructor(connection: MongoConnection, conf: OllamaConfig) {
    super(connection, conf, 'suggested_habits');
  }

  async generateHabits(
    user: User,
    physicInformation: any,
  ): Promise<z.infer<typeof LlamaHabitsGenerator.RESPONSE_STRUCTURE>> {
    const query = `
      usuario: ${JSON.stringify({ id: user.id.value, age: user.birthDate.age(), datos_físicos: physicInformation })}
    `;
    return await this.generateFromEmbeddings(
      LlamaHabitsGenerator.RESPONSE_STRUCTURE,
      LlamaHabitsGenerator.SYSTEM_TEMPLATE,
      query,
    );
  }

  async saveHabitsKnowledgeBase(knowledgeBase: string): Promise<void> {
    await this.saveKnowledgeBase(knowledgeBase);
  }
}
