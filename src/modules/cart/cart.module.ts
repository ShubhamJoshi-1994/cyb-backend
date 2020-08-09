import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { cartProviders } from './cart.provider';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  providers: [CartService, ...cartProviders],
  controllers: [CartController],
  imports: [forwardRef(() => CheckoutModule)],
  exports: [CartService],
})
export class CartModule {}
