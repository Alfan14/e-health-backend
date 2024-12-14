
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

export const Connection = TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'simform',
  database: 'pgWithNest',
  entities: [],
  synchronize: true,
  logging: true,
});

// These is a word