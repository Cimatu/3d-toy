import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Detail } from 'src/cars/details';
import { Cart } from '../carts.entity';
import { CartItemController } from './cart-item.controller';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';


@Module({
  controllers: [CartItemController],
  providers: [CartItemService],
  imports: [
    TypeOrmModule.forFeature([CartItem, Detail, Cart]),
  ],
  exports: [CartItemService]
})
export default class CartItemModule { }
