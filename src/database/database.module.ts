import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule, 
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASS'),
            database: configService.get<string>('DB_NAME'),
            entities: entities,
            synchronize: configService.get<boolean>('DB_SYNC', true),
            ...options, 
          }),
        }),
      ],
    };
  }
}



