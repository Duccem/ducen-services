import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../../../src/infrastructure/Persistence/Mongo/MongoConnection';
import { MockMongoConnectionFactory } from './__mocks__/MockMongoConnectionFactory';

describe('MongoConnection', () => {
  let connection: MongoConnection;

  beforeEach(async () => {
    connection = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL']);
  });

  afterEach(async () => {
    await connection.client.close();
  });

  it('creates a new client with the connection already established', () => {
    expect(connection.client).toBeInstanceOf(MongoClient);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newConnection = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL'], 'test-ducen2');

    expect(newConnection.client).not.toBe(connection.client);

    await newConnection.client.close();
  });
});
