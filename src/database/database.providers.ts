import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Connection } from './connection.provider';

export function createDatabaseProviders(options, entities): Provider[] {
  return [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        Connection.setOptions({ ...options, entities });
        if (!Connection.isInitialized) {
          await Connection.initialize();
        }
        return Connection;
      },
    },
  ];
}
