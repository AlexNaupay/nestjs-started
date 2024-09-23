import { plainToInstance, Transform } from 'class-transformer';
import {
    IsAlphanumeric,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Max,
    Min,
    validateSync,
} from 'class-validator';

enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
    Provision = 'provision',
}

class EnvironmentVariables {
    // ENV
    @IsEnum(Environment)
    @IsNotEmpty()
    @IsOptional()
    NODE_ENV: Environment = Environment.Development;

    // PORT
    @IsNumber()
    @IsOptional()
    @Min(0)
    @Max(65535)
    @Transform(({ value }) => parseInt(value, 10))
    PORT: number = 3000;

    @IsString()
    DATABASE_HOST: string;

    @IsNumber()
    @Min(0)
    @Max(65535)
    @Transform(({ value }) => parseInt(value, 10))
    DATABASE_PORT: number;

    @IsAlphanumeric()
    DATABASE_USER: string;

    @IsAlphanumeric()
    DATABASE_PASSWORD: string;

    @IsString()
    DATABASE_NAME: string;

    @IsString()
    @IsNotEmpty()
    API_KEY: string;

    @IsString()
    @IsNotEmpty()
    ACCESS_TOKEN_KEY: string;

    @IsString()
    @IsNotEmpty()
    REFRESH_TOKEN_KEY: string;
}

export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(EnvironmentVariables, config, { enableImplicitConversion: true });
    const errors = validateSync(validatedConfig, { skipMissingProperties: false });

    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
