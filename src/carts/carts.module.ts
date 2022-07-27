import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { User } from 'src/users/users.entity';
import { Cart } from './carts.entity';


@Module({
  controllers: [],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Cart, User, Car]),
  ],

})
export class CartsModule { }
