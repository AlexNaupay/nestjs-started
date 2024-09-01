import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('/')
    get(@Query() query: any): string {
        const { limit = 20, offset = 0 } = query;
        return `Products Limit ${limit} Offset ${offset}`;
    }

    @Get('/:id')
    show(@Param('id') id: number): string {
        console.log(typeof id); // string
        return `Product ${id}`;
    }

    @Post('/')
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
    delete(@Param('id') id: number): object {
        return {
            message: `Delete a product: ${id}`,
        };
    }
}
