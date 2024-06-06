import { Connection } from 'mongoose';
import { MongoConnection } from '../../../../src/infrastructure/Persistence/Mongo/MongoConnection';
import { MockMongoConnectionFactory } from './__mocks__/MockMongoConnectionFactory';

describe('MongoConnection', () => {
  let connection: MongoConnection;

  beforeEach(async () => {
    connection = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL']);
  });

  afterEach(async () => {
    await connection.close();
  });

  it('creates a new client with the connection already established', () => {
    expect(connection.getConnection()).toBeInstanceOf(Connection);
  });

  it('creates a new client if it does not exist a client with the given name', async () => {
    const newConnection = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL']);

    expect(newConnection.getConnection()).not.toBe(connection.getConnection());

    await newConnection.close();
  });
});
