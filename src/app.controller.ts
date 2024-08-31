import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/products/:id')
    showProduct(@Param('id') id: number, @Query() query: any): string {
        const { limit = 20, offset = 0 } = query;
        console.log(typeof id); // string
        return `Product ${id} Limit ${limit} Offset ${offset}`;
    }

    @Get('/users/:id')
    showUser(@Param() params: any): string {
        return `User ${params.id}`;
    }
}
