import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { CheckoutService } from './modules/checkout/checkout.service';
import { CheckoutModule } from './modules/checkout/checkout.module';


@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductsModule,
    CartModule,
    CheckoutModule,
  ],
  controllers: [AppController],
  providers: [AppService, CheckoutService],
})
export class AppModule {}
