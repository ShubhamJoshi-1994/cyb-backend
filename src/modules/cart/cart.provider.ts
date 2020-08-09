import { Cart } from './cart.entity';
import { CART_REPOSITORY } from '../../core/constants';

export const cartProviders = [{
    provide: CART_REPOSITORY,
    useValue: Cart,
}];