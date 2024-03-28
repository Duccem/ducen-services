import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../src/Persistence/Mongo/MongoConnection';
import { MongoConnectionMother } from './MongoConnectionMother';

describe('MongoConnection', () => {
  let connection: MongoConnection;

  beforeEach(async () => {
    connection = await MongoConnectionMother.create();
  });

  afterEach(async () => {
    await connection.client.close();
  });

  it('creates a new client with the connection already established', () => {
    expect(connection.client).toBeInstanceOf(MongoClient);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newConnection = await MongoConnectionMother.create('test-ducen2');

    expect(newConnection.client).not.toBe(connection.client);

    await newConnection.client.close();
  });
});
