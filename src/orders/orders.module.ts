import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailsModule from 'src/cars/details/details.module';
import { CartItem } from 'src/carts/cart-item/cart-item.entity';
import { User } from 'src/users/users.entity';
import UsersModule from 'src/users/users.module';
import { OrdersController } from './orders.controller';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';



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
