/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Inject } from '@nestjs/common';
import { Product } from './products.entity';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from '../../core/constants';

@Injectable()
export class ProductsService {
    constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product) { }

    async create(product: ProductDto): Promise<Product> {
        return await this.productRepository.create<Product>({ name: product.name, price: product.price, rules: JSON.stringify(product.rules) });
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.findAll<Product>();
    }

    async findOne(id:number): Promise<Product> {
        return await this.productRepository.findOne({
        	where: { id },
    	});
    }

    async delete(id) {
        return await this.productRepository.destroy({ where: { id } });
    }

    async update(id, product: ProductDto) {
        const [numberOfAffectedRows, [updatedProduct]] = await this.productRepository.update({ name: product.name, price: product.price, rules: JSON.stringify(product.rules) }, { where: { id }, returning: true });

        return { numberOfAffectedRows, updatedProduct };
    }
}