/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Inject } from '@nestjs/common';
import { Cart } from './cart.entity';
// import { ProductDto } from './dto/product.dto';
import { CART_REPOSITORY } from '../../core/constants';

@Injectable()
export class CartService {
    constructor(@Inject(CART_REPOSITORY) private readonly cartRepository: typeof Cart) { }

    async findAll(): Promise<Cart[]> {
        return await this.cartRepository.findAll<Cart>();
    }

    async findOne(id:number): Promise<Cart> {
        return await this.cartRepository.findOne({
        	where: { id },
    	});
    }

    async addItems(items): Promise<Cart> {
        return await this.cartRepository.create<Cart>({ items: items });
    }

    async getCartItems(id): Promise<Cart> {
        return await this.cartRepository.findOne({
        	where: { id },
    	});
    }
   
}