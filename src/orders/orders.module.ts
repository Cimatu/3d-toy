import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailsModule from 'src/cars/details/details.module';
import UsersModule from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartItem } from 'src/carts/cart-item/cart-item.entity';
import { User } from 'src/users/users.entity';
import { Order } from './orders.entity';


@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, User, CartItem]),
    DetailsModule,
    UsersModule
  ],
})
export default class OrdersModule { }
