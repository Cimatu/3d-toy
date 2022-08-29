import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailsModule from 'src/cars/details/details.module';
import CartItemModule from './cart-item/cart-item.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Car } from 'src/cars/cars.entity';
import { Detail } from 'src/cars/details';
import { User } from 'src/users/users.entity';
import { CartItem } from './cart-item/cart-item.entity';
import { Cart } from './carts.entity';


@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem, User, Car, Detail]),
    DetailsModule,
    CartItemModule
  ],
  exports: [
    CartsService
  ]
})
export default class CartsModule { }
