import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Product } from '../products/product.entity';
import { Brand } from '../brands/entities/brand.entity';
import { User } from '../users/entities/user.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.user'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                entities: [Product, Brand, User],
                synchronize: true,
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class DatabaseModule {
    // constructor(private dataSource: DataSource) {}
}
