import { LlamaGenerator, MongoConnection } from '@ducen-services/shared';
import { PromptTemplate } from '@langchain/core/prompts';
import { Appointment } from '../../Appointment/domain/Appointment';
import { Doctor } from '../../Doctor/domain/Doctor';
import { User } from '../../User/domain/User';
export class OllamaSuggestedDoctorsGenerator extends LlamaGenerator {
  static SYSTEM_TEMPLATE = `
    * Actúa como un sistema de recomendación de doctores
    * Solo debes recomendar doctores de la siguiente lista en formato JSON (IMPORTANTE no recomendar doctores que no estén en la lista)
    * {context}
    * Devuelve únicamente el listado de 3 doctores recomendados
    * Utiliza el formato JSON para devolver la respuesta
    * Basa tu respuesta en los datos del usuario y las consultas previas
    * Si no puedes recomendar ningún doctor, responde con una lista vacía
    * Los datos del usuario y sus consultas previas son: {query}`;
  constructor(connection: MongoConnection) {
    super(connection, 'http://localhost:11434', 'llama3', 'suggested_doctors');
  }
  async getSuggestedDoctors(user: User, lastThreeConsults: Appointment[], doctors: Doctor[]): Promise<string> {
    const MESSAGES = [PromptTemplate.fromTemplate(OllamaSuggestedDoctorsGenerator.SYSTEM_TEMPLATE)];
    const doctorsDataStringified = doctors
      .map((doctor) => JSON.stringify({ id: doctor.id.value, specialty: doctor.specialty.value }))
      .join('\n');
    const query = `
      usuario: ${JSON.stringify({ id: user.id.value, age: user.birthDate.age() })}
      ultimas tres consultas: ${JSON.stringify(lastThreeConsults.map((consult) => consult.toString()))}
    `;
    return this.generateFromPrompt(MESSAGES, query, doctorsDataStringified);
  }
}
