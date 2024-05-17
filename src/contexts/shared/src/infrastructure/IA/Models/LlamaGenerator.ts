import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { Ollama } from '@langchain/community/llms/ollama';
import { LengthBasedExampleSelector } from '@langchain/core/example_selectors';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { FewShotPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ZodSchema } from 'zod';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { MongoVectorStore } from '../VectorStores/MongoVectorStore';

export abstract class LlamaGenerator {
  private model: Ollama;
  private vectorStore: MongoVectorStore;
  constructor(connection: MongoConnection, url: string, collectionName?: string) {
    this.vectorStore = new MongoVectorStore(connection, new OllamaEmbeddings(), collectionName);
    this.model = new Ollama({
      model: 'llama3',
      temperature: 0,
      baseUrl: url,
    });
  }

  async generateFromEmbeddings<T>(structure: ZodSchema<T>, template: string, query: string) {
    const docs = await this.vectorStore.queryDocuments(query);
    const context = docs.map((doc) => doc.pageContent).join('\n\n');
    return await this.generate(structure, template, query, context);
  }

  async generateFromExamples<T>(
    structure: ZodSchema<T>,
    template: string,
    query: string,
    examples: { input: string; output: string }[],
  ) {
    const examplePrompt = new PromptTemplate({
      inputVariables: ['input', 'output'],
      template: '{input}\n{output}',
    });
    const exampleSelector = await LengthBasedExampleSelector.fromExamples(examples, { examplePrompt, maxLength: 500 });
    const dynamicPrompt = new FewShotPromptTemplate({
      prefix: template,
      examplePrompt,
      exampleSelector,
      suffix: '{query}\n',
      inputVariables: [],
    });
    const formattedPrompt = await dynamicPrompt.format({});
    return await this.generate(structure, formattedPrompt, query, undefined);
  }

  async generate<T>(structure: ZodSchema<T>, template: string, query: string, context?: string): Promise<T> {
    const prompt = PromptTemplate.fromTemplate(template);
    const outputParser = StructuredOutputParser.fromZodSchema(structure);
    const chain = RunnableSequence.from([prompt, this.model, outputParser]);
    const answer = await chain.invoke({
      query,
      context,
      format_instructions: outputParser.getFormatInstructions(),
    });
    return answer;
  }

  async saveKnowledgeBase(text: string): Promise<void> {
    await this.vectorStore.saveKnowledgeBase(text);
  }
}
