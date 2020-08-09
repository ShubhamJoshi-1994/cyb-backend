/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CheckoutService } from '../checkout/checkout.service';
import { Cart as CartEntity } from './cart.entity';
import { ItemsDto } from './dto/items.dto';

@Controller('carts')
export class CartController {
    constructor(private readonly cartService: CartService, private readonly checkoutService: CheckoutService) { }

    @Get()
    async findAll() {
        return await this.cartService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CartEntity> {
        const cart = await this.cartService.findOne(id);

        if (!cart) {
            throw new NotFoundException('This Product doesn\'t exist');
        }

        return cart;
    }

    @Post('add-items')
    async addToCart(@Body() items: ItemsDto): Promise<CartEntity> {
        return await this.cartService.addItems(JSON.stringify(items.items));
    }

    @Get(':id/checkout')
    async checkoutCart(@Param('id') id: number) {
        const cart = await this.cartService.getCartItems(id);
        if (!cart) {
            throw new NotFoundException('This Cart doesn\'t exist');
        } else {
            const cartItems = JSON.parse(cart.items);
            return this.checkoutService.checkout(cartItems, id);
        }
    }
}