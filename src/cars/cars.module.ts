import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/carts.entity';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { CarsController } from './cars.controller';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';
import { CarBody, Spoiler, Toning, Wheel } from './details';
import BodiesModule from './details/bodies/bodies.module';
import SpoilersModule from './details/spoilers/spoilers.module';
import ToningsModule from './details/tonings/tonings.module';
import WheelsModule from './details/wheels/wheels.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    TypeOrmModule.forFeature([Car, User, CarBody, Spoiler, Toning, Wheel, Cart]),
    UsersModule,
    WheelsModule,
    BodiesModule,
    SpoilersModule,
    ToningsModule
  ],
  exports: [
    CarsService
  ]
})
export class CarsModule { }
