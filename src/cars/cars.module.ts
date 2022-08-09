import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/carts/carts.entity';
import { User } from 'src/users/users.entity';
import UsersModule from 'src/users/users.module';
import { CarsController } from './cars.controller';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';
import Detail from './details/deltails.entity';
import DetailsModule from './details/details.module';


@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    TypeOrmModule.forFeature([Car, User, Cart, Detail]),
    UsersModule,
    DetailsModule
  ],
  exports: [
    CarsService
  ]
})
export default class CarsModule { }
