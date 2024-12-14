import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

export const Connection = {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
        const options: DataSourceOptions = {
            type:configService.get<string>('DB_TYPE') as any,
            host:configService.get<string>('POSTGRES_HOST'),
            port:configService.get<number>('POSTGRES_PORT'),
            username:configService.get<string>('POSTGRES_USER'),
            password:configService.get<string>('POSTGRES_PASSWORD'),
            database:configService.get<string>('POSTGRES_DB'),
            entities: [User, Product],
        };
    const dataSource = new DataSource(options);
        if (!dataSource.isInitialized) {
        await dataSource.initialize();
        }
        return dataSource;
    },
};

// These is a word