import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
@Module({})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = [
      {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (configService: ConfigService) => {
          const dbHost = configService.get<string>('DB_HOST');
          const dbPort = configService.get<number>('DB_PORT');
          const dbUser = configService.get<string>('DB_USER');
          const dbPass = configService.get<string>('DB_PASS');
          const dbName = configService.get<string>('DB_NAME');
          
          return {
            type: 'postgres',
            host: dbHost,
            port: dbPort,
            username: dbUser,
            password: dbPass,
            database: dbName,
            entities,
            synchronize: true,
          };
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}


