import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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

    await app.listen(configService.get('PORT'));
}

bootstrap();
