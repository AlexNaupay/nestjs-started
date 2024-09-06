import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { ParseIntegerIdPipe } from '../common/parse-integer-id.pipe';
import { CreateProductDto, UpdateProductDto } from './products.dtos';
import { ConfigService } from '@nestjs/config';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly configService: ConfigService,
    ) {}

    @Get('/')
    list(@Query() query: any): object {
        console.log(this.configService.get('database.user'));
        const { limit = 20, offset = 0 } = query;
        return {
            limit,
            offset,
            data: this.productsService.findAll(),
        };
    }

    @Get('/:id')
    @HttpCode(HttpStatus.FOUND)
    show(@Param('id', ParseIntegerIdPipe) id: number): object {
        console.log(typeof id); // string
        throw new NotFoundException('Not found product');
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    store(@Body() data: CreateProductDto): object {
        return {
            message: 'Added a new product',
            data: data,
        };
    }

    @Put('/:id')
    update(@Param('id', ParseIntegerIdPipe) id: number, @Body() body: UpdateProductDto): object {
        return {
            message: `Update a product: ${id}`,
            data: body,
        };
    }

    @Delete('/:id')
    delete(@Param('id') id: number, @Res() res: Response): object {
        return res.status(HttpStatus.OK).send({
            message: `Delete a product: ${id}`,
        });
    }
}
