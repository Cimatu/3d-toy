import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailsModule from './details/details.module';
import UsersModule from 'src/users/users.module';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import Detail from './details/deltails.entity';
import { Cart } from 'src/carts/carts.entity';
import { User } from 'src/users/users.entity';
import { Car } from './cars.entity';


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
