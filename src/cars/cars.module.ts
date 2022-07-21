import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { CarsController } from './cars.controller';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';
import { CarBody, Spoiler, Toning, Wheel } from './details';
import WheelsModule from './details/wheels/wheels.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    TypeOrmModule.forFeature([Car, User, CarBody, Spoiler, Toning, Wheel]),
    WheelsModule
  ],
})
export class CarsModule { }
