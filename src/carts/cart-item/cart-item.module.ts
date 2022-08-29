import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.entity';
import { Detail } from 'src/cars/details';
import { Order } from 'src/orders/orders.entity';
import { Cart } from '../carts.entity';


@Module({
  controllers: [CartItemController],
  providers: [CartItemService],
  imports: [
    TypeOrmModule.forFeature([CartItem, Detail, Cart, Order]),
  ],
  exports: [CartItemService]
})
export default class CartItemModule { }
