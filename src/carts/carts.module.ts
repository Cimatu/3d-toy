import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { User } from 'src/users/users.entity';
import { CartsController } from './carts.controller';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';


@Module({
  controllers: [CartsController],
  providers: [CartsService],
  imports: [
    TypeOrmModule.forFeature([Cart, User, Car]),
  ],
  exports: [
    CartsService
  ]
})
export class CartsModule { }
