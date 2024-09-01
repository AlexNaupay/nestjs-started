import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 5,
            name: 'Product A',
            description: 'Desc',
            price: 12.5,
            stock: 9,
            image: 'url',
        },
    ];

    findAll() {
        return this.products;
    }
}
