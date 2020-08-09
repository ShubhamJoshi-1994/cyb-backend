import { Product } from './products.entity';
import { PRODUCT_REPOSITORY } from '../../core/constants';

export const productsProviders = [{
    provide: PRODUCT_REPOSITORY,
    useValue: Product,
}];