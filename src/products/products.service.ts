import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number) {
        return this.productsRepository.findOneBy({ id });
    }
}
