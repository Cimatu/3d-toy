import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CartsModule from 'src/carts/carts.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Car } from 'src/cars/cars.entity';
import { Cart } from 'src/carts/carts.entity';
import { Order } from 'src/orders/orders.entity';
import { User } from './users.entity';
import Token from 'src/auth/token/token.entity';


@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Car, Cart, Order, Token]),
    CartsModule
  ],
  exports: [
    UsersService
  ]
})
export default class UsersModule { }
