import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

    @IsNotEmpty()
    @IsPositive()
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
}

// Add optional to all properties
export class UpdateProductDto extends PartialType(CreateProductDto) {}
