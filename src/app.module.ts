import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Car } from './cars/cars.entity';
import { Cart } from './carts/carts.entity';
import { CartItem } from './carts/cart-item/cart-item.entity';
import { Order } from './orders/orders.entity';
import { Event } from './events/events.entity';
import { UserData } from './events/usersData/usersData.entity';
import { FAQ } from './faq/faq.entity';
import { Detail, BallBearingSet, Gear, BodyCar, Spacer, Cylinder, Roller, Motor } from './cars/details';
import UsersModule from './users/users.module';
import CarsModule from './cars/cars.module';
import CartsModule from './carts/carts.module';
import CartItemModule from './carts/cart-item/cart-item.module';
import OrdersModule from './orders/orders.module';
import EventsModule from './events/events.module';
import UserDataModule from './events/usersData/usersData.module';
import DetailsModule from './cars/details/details.module';
import BallBearingModule from './cars/details/sets/bbs/ball-bearing.module';
import GearsModule from './cars/details/sets/gears/gears.module';
import CarBodiesModule from './cars/details/car-bodies/car-bodies.module';
import SpacersModule from './cars/details/spacers/spacers.module';
import CylindersModule from './cars/details/cylinders/cylinders.module';
import RollersModule from './cars/details/rollers/rollers.module';
import FAQsModule from './faq/faq.module';
import { Video } from './video/video.entity';
import VideoModule from './video/video.module';
import { News } from './news/news.entity';
import NewsModule from './news/news.module';

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
      entities: [User, Car, Cart, CartItem, Order, Event, UserData, FAQ, Detail, BallBearingSet, Gear, BodyCar, Spacer, Cylinder, Roller, Motor, Video, News],
      synchronize: true,
      // ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
    CarsModule,
    CartsModule,
    CartItemModule,
    OrdersModule,
    EventsModule,
    UserDataModule,
    DetailsModule,
    BallBearingModule,
    GearsModule,
    CarBodiesModule,
    SpacersModule,
    CylindersModule,
    RollersModule,
    FAQsModule,
    VideoModule,
    NewsModule
  ],
})
export class AppModule { }
