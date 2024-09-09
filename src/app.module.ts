import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './common/database.module';
import configuration from './config/configuration';
import { environments } from './environments';
import { validate } from './config/env.validation';

const API_KEY_X = 'key_value_for_x';

@Module({
    imports: [
        // config configuration
        ConfigModule.forRoot({
            envFilePath: environments[process.env.NODE_ENV] || '.env',
            load: [configuration],
            validate: validate,
            isGlobal: true,
            expandVariables: true,
            validationOptions: {
                allowUnknown: false,
                abortEarly: true,
            },
        }),
        ProductsModule,
        DatabaseModule,
    ],
    controllers: [AppController, CategoriesController],
    providers: [AppService, { provide: 'API_KEY_X', useValue: API_KEY_X }],
})
export class AppModule {}
// yarn  --save-dev @types/joi
// "esModuleInterop": true in tsconfig
