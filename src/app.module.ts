import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.entity';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './cars/cars.entity';
import { CarsModule } from './cars/cars.module';
import { CarBody, Spoiler, Toning, Wheel } from './cars/details';
import WheelsModule from './cars/details/wheels/wheels.module';
import SpoilersModule from './cars/details/spoilers/spoilers.module';
import ToningsModule from './cars/details/tonings/tonings.module';
import BodiesModule from './cars/details/bodies/bodies.module';

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
      entities: [User, Car, Wheel, Spoiler, Toning, CarBody],
      synchronize: true,
    }),
    UsersModule,
    CarsModule,
    WheelsModule,
    SpoilersModule,
    ToningsModule,
    BodiesModule
  ],
})
export class AppModule { }
