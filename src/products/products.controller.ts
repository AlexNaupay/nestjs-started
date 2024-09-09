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
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly configService: ConfigService,
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'List of products' })
    async list(@Query() query: any) {
        console.log(this.configService.get('database.user'));
        const { limit = 20, offset = 0 } = query;

        return {
            limit,
            offset,
            data: await this.productsService.findAll(),
        };
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    async show(@Param('id', ParseIntegerIdPipe) id: number) {
        console.log(typeof id); // string
        const product = await this.productsService.findOne(id);

        if (!product) {
            throw new NotFoundException('Not found product');
        }

        return product;
    }

    @Post('/')
    @HttpCode(HttpStatus.CREATED)
    async store(@Body() data: CreateProductDto) {
        const newProduct = await this.productsService.store(data);
        return {
            message: 'Added a new product',
            data: newProduct,
        };
    }

    @Put('/:id')
    update(@Param('id', ParseIntegerIdPipe) id: number, @Body() data: UpdateProductDto) {
        return this.productsService.update(id, data);
    }

    @Delete('/:id')
    delete(@Param('id') id: number, @Res() res: Response): object {
        return res.status(HttpStatus.OK).send({
            message: `Delete a product: ${id}`,
        });
    }
}
