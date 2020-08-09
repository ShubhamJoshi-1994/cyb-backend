import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders } from './cart.provider';
// import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  providers: [CartService, ...cartProviders],
  controllers: [CartController],
  // imports: [CheckoutModule]
})
export class CartModule {}
