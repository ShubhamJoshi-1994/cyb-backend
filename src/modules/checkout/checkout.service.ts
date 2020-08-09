/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import * as _ from "lodash";
import { ProductsService } from '../products/products.service';
import { CartService } from '../cart/cart.service';
import { TOTAL_DISCOUNT } from '../../core/constants';

@Injectable()
export class CheckoutService {
    constructor(private readonly productsService: ProductsService, private readonly cartService: CartService) { }

    private billingCart = [];
    private cartTotals = {
        total_price: null,
        total_discount: null,
    };

    async checkout(items, cartId) {
        this.billingCart = [];
        const groupedItemsByName = _.groupBy(items, (value) => {
            return value.item
        });

        for(const key in groupedItemsByName) {
            await this.scan(groupedItemsByName[key]);
        }
        
        await this.applyDiscountOnTotalPrice()
        await this.updateFinalPricesForCart(cartId);
        return await this.billingCart;
    }

    async scan(namedItem) {
        const product = await this.getProductRules(namedItem[0].id)
        const productRules = JSON.parse(product.rules);

        const billItem = {
            name: product.name,
            quantity: namedItem.length,
            price: namedItem.length*product.price
        }

        this.computeItemDiscount(productRules, namedItem.length, billItem)
        this.billingCart.push(billItem);
    }


    async computeItemDiscount(itemRules, itemCount, billingItem) {
        let itemDiscountRule = null;
        let itemDiscount = 0;

        if (itemRules.length) {
            itemDiscountRule = itemRules[0];
        }

        if (itemDiscountRule) {
            if(itemCount < itemDiscountRule.quantityForDiscount) {
                itemDiscount = 0;
            } else if (itemCount > itemDiscountRule.quantityForDiscount) {
                itemDiscount = Math.floor(itemCount/itemDiscountRule.quantityForDiscount)*itemDiscountRule.discountPrice
            } else {
                itemDiscount = itemDiscountRule.quantityForDiscount * itemDiscountRule.discountPrice
            }
        } else {
            itemDiscount = 0;
        }

        billingItem.discount = itemDiscount;
        billingItem.final_total_price_for_item = billingItem.price - itemDiscount;
    }


    async applyDiscountOnTotalPrice() {
        const cartTotalValueAfterItemsDiscount = _.sumBy(this.billingCart, 'final_total_price_for_item')
        const totalItemsDiscount = _.sumBy(this.billingCart, 'discount')

        if (cartTotalValueAfterItemsDiscount > TOTAL_DISCOUNT[0].minTotalAmount) {
            const totals = {
                total: cartTotalValueAfterItemsDiscount - TOTAL_DISCOUNT[0].additionalDiscount,
                total_discount: totalItemsDiscount + TOTAL_DISCOUNT[0].additionalDiscount
            }
            
            this.cartTotals.total_price = totals.total;
            this.cartTotals.total_discount = totals.total_discount;
            this.billingCart.push(totals);
        } else {
            const totals = {
                total: cartTotalValueAfterItemsDiscount,
                total_discount: totalItemsDiscount
            }
            
            this.cartTotals.total_price = totals.total;
            this.cartTotals.total_discount = totals.total_discount;
            this.billingCart.push(totals);
        }

        return this.billingCart;
    }

    async getProductRules(id) {
        const product = await this.productsService.findOne(id)
        return product;
    }

    async updateFinalPricesForCart(id) {
        return await this.cartService.updateFinalPrice(id, this.cartTotals)
    }
   
}