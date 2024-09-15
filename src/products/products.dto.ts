import { IsString, IsNumber, IsUrl, IsNotEmpty, IsPositive, Min, IsInt } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

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
    @IsInt()
    @Min(0)
    @ApiProperty({ description: 'Number of products on store', example: '5' })
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    readonly image: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    readonly brand_id: number;
}

// Add optional to all properties
export class UpdateProductDto extends PartialType(CreateProductDto) {}
