import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  imports: [ConfigModule],
  providers: [Connection],
  exports: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      global :true,
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
