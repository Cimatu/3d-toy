import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Car } from './cars/cars.entity';
import { Cart } from './carts/carts.entity';
import { Spoiler, Toning, Wheel, Detail, BallBearingSet, Gear, BodyCar } from './cars/details';
import UsersModule from './users/users.module';
import CarsModule from './cars/cars.module';
import CartsModule from './carts/carts.module';
import DetailsModule from './cars/details/details.module';
import BallBearingModule from './cars/details/sets/bbs/ball-bearing.module';
import GearsModule from './cars/details/sets/gears/gears.module';
import CarBodiesModule from './cars/details/car-bodies/car-bodies.module';
import WheelsModule from './cars/details/wheels/wheels.module';
import SpoilersModule from './cars/details/spoilers/spoilers.module';
import ToningsModule from './cars/details/tonings/tonings.module';
import { CartItem } from './carts/cart-item/cart-item.entity';
import CartItemModule from './carts/cart-item/cart-item.module';
import OrdersModule from './orders/orders.module';
import { Order } from './orders/orders.entity';
import { Event } from './events/events.entity';
import { UserData } from './events/usersData/usersData.entity';
import EventsModule from './events/events.module';
import UserDataModule from './events/usersData/usersData.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Car, Cart, CartItem, Order, Wheel, Spoiler, Toning, Detail, BallBearingSet, Gear, BodyCar, Event, UserData],
      synchronize: true,
      ssl: true,
      // extra: {
      //   ssl: true
      // }
    }),
    UsersModule,
    CarsModule,
    CartsModule,
    CartItemModule,
    OrdersModule,
    WheelsModule,
    SpoilersModule,
    ToningsModule,
    DetailsModule,
    BallBearingModule,
    GearsModule,
    CarBodiesModule,
    EventsModule,
    UserDataModule

  ],
})
export class AppModule { }
