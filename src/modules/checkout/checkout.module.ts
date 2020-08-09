import { Module, forwardRef } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { ProductsModule } from '../products/products.module';
import { CartModule } from '../cart/cart.module';

@Module({
  providers: [CheckoutService],
  controllers: [],
  exports: [CheckoutService],
  imports: [ProductsModule, forwardRef(() => CartModule)]
})
export class CheckoutModule {}
