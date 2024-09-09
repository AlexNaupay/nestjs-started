import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    store(data: CreateProductDto): Promise<Product> {
        const newProduct = this.productsRepository.create(data); // Instance a new product
        return this.productsRepository.save(newProduct); // Save on database
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productsRepository.findOneBy({ id });
    }
}
