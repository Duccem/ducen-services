import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export class TextDocumentCreator {
  async loadAndSplitDocument(text: string): Promise<any> {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await textSplitter.createDocuments([text]);
    return splitDocs;
  }
}
