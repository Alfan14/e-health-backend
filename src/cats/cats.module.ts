
import { Module , Global ,DynamicModule} from '@nestjs/common';
import { createDatabaseProviders } from '../database/database.providers';
import { Connection } from '../database/connection.provider';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]

})
export class CatsModule {}

