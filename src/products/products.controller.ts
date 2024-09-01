import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
    @Get('/')
    get(@Query() query: any): string {
        const { limit = 20, offset = 0 } = query;
        return `Products Limit ${limit} Offset ${offset}`;
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
