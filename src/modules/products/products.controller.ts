/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product as ProductEntity } from './products.entity';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<ProductEntity> {
        const product = await this.productService.findOne(id);

        // if the post doesn't exit in the db, throw a 404 error
        if (!product) {
            throw new NotFoundException('This Product doesn\'t exist');
        }

        return product;
    }

    @Post()
    async create(@Body() product: ProductDto): Promise<ProductEntity> {
        // create a new post and return the newly created post
        return await this.productService.create(product);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() product: ProductDto): Promise<ProductEntity> {
        const { numberOfAffectedRows, updatedProduct } = await this.productService.update(id, product);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return updatedProduct;
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        const deleted = await this.productService.delete(id);

        if (deleted === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return 'Successfully deleted';
    }
}