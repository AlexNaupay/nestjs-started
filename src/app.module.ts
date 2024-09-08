import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Client } from 'pg';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import configuration from '../config/configuration';

const client = new Client({
    user: 'root',
    password: '123456',
    host: '127.0.0.1',
    port: 5432,
    database: 'store_db',
});

client.connect();

client.query('SELECT * FROM tasks', (err, res) => {
    console.log(err);
    console.log(res.rows);
});

@Module({
    imports: [ProductsModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
    controllers: [AppController, CategoriesController],
    providers: [AppService],
})
export class AppModule {}
