import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // Ignorar datos que no estén en los DTO
            forbidNonWhitelisted: true, // Lanzar error si existen datos prohibidos
            // Deshabilitar detalles de mensajes de error (producción)
            disableErrorMessages: process.env.ENVIRONMENT == 'production',
        }),
    );
    const configService = app.get(ConfigService);

    const config = new DocumentBuilder()
        .setTitle('Store API')
        .setDescription('The store API description')
        .setVersion('1.0')
        .addTag('store')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    // app.enableCors();
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    app.use(cookieParser());

    await app.listen(configService.get('PORT'));
}

bootstrap();
