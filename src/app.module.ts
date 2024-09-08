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

const API_KEY_X = 'key_value_for_x';

@Module({
    imports: [ProductsModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
    controllers: [AppController, CategoriesController],
    providers: [
        AppService,
        { provide: 'API_KEY_X', useValue: API_KEY_X },
        {
            provide: 'TASKS',
            useFactory: async (http: HttpService) => {
                // 👈 implement useFactory
                const tasks = await http.get('https://jsonplaceholder.typicode.com/todos').toPromise();
                return tasks.data;
            },
            inject: [HttpService],
        },
    ],
})
export class AppModule {}
