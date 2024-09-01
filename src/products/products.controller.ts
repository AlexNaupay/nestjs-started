import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get('/')
    list(@Query() query: any): object {
        const { limit = 20, offset = 0 } = query;
        return {
            limit,
            offset,
            data: this.productsService.findAll(),
        };
    }

    @Get('/:id')
    @HttpCode(HttpStatus.FOUND)
    show(@Param('id') id: number): string {
        console.log(typeof id); // string
        return `Product ${id}`;
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    store(@Body() body: any): object {
        return {
            message: 'Added a new product',
            data: body,
        };
    }

    @Put('/:id')
    update(@Param('id') id: number, @Body() body: any): object {
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
