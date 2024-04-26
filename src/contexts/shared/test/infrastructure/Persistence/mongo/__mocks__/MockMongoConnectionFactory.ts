import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../../../../src/infrastructure/Persistence/Mongo/MongoConnection';
import { MongoConnectionFactory } from '../../../../../src/infrastructure/Persistence/Mongo/MongoConnectionFactory';

export class MockMongoConnectionFactory extends MongoConnectionFactory {
  static double() {
    return new MongoConnection(null as unknown as MongoClient);
  }
}
