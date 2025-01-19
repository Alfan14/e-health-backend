import { DataSource } from 'typeorm';
import { User } from '../api/users/entities/user.entity'

export const Connection = new DataSource({
  type: 'postgres', 
  host: process.env.DB_HOST,  
  port: parseInt(process.env.DB_PORT, 10),  
  username: process.env.DB_USER, 
  password: process.env.DB_PASS,  
  database: process.env.DB_NAME,  
  synchronize: process.env.DB_SYNC === 'true',
  entities: [User],  
});
