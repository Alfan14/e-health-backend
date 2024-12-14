import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export function createDatabaseProviders(
    configService: ConfigService,
    entities: Function[],
  ) {
    const options: DataSourceOptions = {
      type:configService.get<string>('POSTGRES_TYPE') as any,
      host:configService.get<string>('POSTGRES_HOST'),
      port:configService.get<number>('POSTGRES_PORT'),
      username:configService.get<string>('POSTGRES_USER'),
      password:configService.get<string>('POSTGRES_PASSWORD'),
      database:configService.get<string>('POSTGRES_DB'),
      entities,
    };
  
    const dataSource = new DataSource(options);
  
    return [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
          if (!dataSource.isInitialized) {
            await dataSource.initialize();
          }
          return dataSource;
        },
      },
      ...entities.map((entity) => ({
        provide: `${entity.name.toUpperCase()}_REPOSITORY`,
        useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
        inject: ['DATABASE_CONNECTION'],
      })),
    ];
  }