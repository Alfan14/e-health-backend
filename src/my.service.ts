import { Injectable, Inject } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MyService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: DataSource,
  ) {}

  async fetchData() {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    const result = await queryRunner.query('SELECT * FROM users');
    await queryRunner.release();
    return result;
  }
}