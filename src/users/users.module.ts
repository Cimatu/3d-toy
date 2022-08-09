import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { Cart } from 'src/carts/carts.entity';
import CartsModule from 'src/carts/carts.module';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Car, Cart]),
    CartsModule
  ],
  exports: [
    UsersService
  ]
})
export default class UsersModule { }
