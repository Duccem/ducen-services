/* eslint-disable @typescript-eslint/no-var-requires */
import { SQLiteConnection } from '@ducen/client';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useState } from "react";

async function createConnection() {
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require('../../../assets/hospital.db')).uri,
    FileSystem.documentDirectory + 'SQLite/hospital.db'
  );
  return SQLite.openDatabase('myDatabaseName.db');
}

export interface DatabaseConnectionContextProps {

}
const DatabaseConnectionContext = createContext<DatabaseConnectionContextProps>({} as DatabaseConnectionContextProps);

export const DatabaseConnectionProvider = ({ children }: any) => {
  const [connection, setConnection] = useState<SQLiteConnection | null>(null);

  const connect = useCallback(async () => {
    const connection = await createConnection();
    const createdConnection = new SQLiteConnection(connection);
    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return null;
  }

  return (
    <DatabaseConnectionContext.Provider value={{}} >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export const useDatabaseConnection = () => useContext(DatabaseConnectionContext);
