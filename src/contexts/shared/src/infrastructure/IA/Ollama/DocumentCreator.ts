import { CSVLoader } from 'langchain/document_loaders/fs/csv';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { extname } from 'path';
export class DocumentCreator {
  async createFromDocument(document: string): Promise<any> {
    const loader = this.selectLoader(document, extname(document));
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await textSplitter.splitDocuments(docs);
    return splitDocs;
  }

  async createFromDirectory(directory: string): Promise<any> {
    const loader = new DirectoryLoader(directory, {
      '.pdf': (path) => new PDFLoader(path),
      '.txt': (path) => new TextLoader(path),
      '.csv': (path) => new CSVLoader(path),
    });
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await textSplitter.splitDocuments(docs);
    return splitDocs;
  }

  async createFromText(text: string): Promise<any> {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splitDocs = await textSplitter.createDocuments([text]);
    return splitDocs;
  }

  selectLoader(path: string, extension: string): any {
    switch (extension) {
      case '.pdf':
        return new PDFLoader(path);
      case '.txt':
        return new TextLoader(path);
      case '.csv':
        return new CSVLoader(path);
      default:
        return null;
    }
  }
}
