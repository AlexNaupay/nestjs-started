import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
    @Get('/:id')
    showProduct(@Param('id') id: number, @Query() query: any): string {
        const { limit = 20, offset = 0 } = query;
        console.log(typeof id); // string
        return `Product ${id} Limit ${limit} Offset ${offset}`;
    }
}
