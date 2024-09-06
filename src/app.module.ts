import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

@Module({
    imports: [ProductsModule, ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
    controllers: [AppController, CategoriesController],
    providers: [AppService],
})
export class AppModule {}
