import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import Detail from '../deltails.entity';
import { WheelsController } from './wheels.controller';
import Wheel from './wheels.entity';
import { WheelsService } from './wheels.service';


@Module({
  controllers: [WheelsController],
  providers: [WheelsService],
  imports: [
    TypeOrmModule.forFeature([Wheel, Car, Detail]),
  ],
  exports: [
    WheelsService
  ]
})
export default class WheelsModule { }
