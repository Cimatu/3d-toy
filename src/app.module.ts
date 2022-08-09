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
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Car, Cart, CartItem, Wheel, Spoiler, Toning, Detail, BallBearingSet, Gear, BodyCar],
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    CartsModule,
    CartItemModule,
    WheelsModule,
    SpoilersModule,
    ToningsModule,
    DetailsModule,
    BallBearingModule,
    GearsModule,
    CarBodiesModule
  ],
})
export class AppModule { }
