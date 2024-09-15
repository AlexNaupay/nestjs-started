import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './products.dto';

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

    async update(id: number, data: UpdateProductDto): Promise<Product> {
        const product = await this.productsRepository.findOneBy({ id });
        //const updatedProduct = Object.assign(product, data);
        const updatedProduct = this.productsRepository.merge(product, data);
        return this.productsRepository.save(updatedProduct); // Save on database
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productsRepository.delete(id);
    }

    findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findOne(id: number): Promise<Product> {
        return this.productsRepository.findOneBy({ id });
    }
}
