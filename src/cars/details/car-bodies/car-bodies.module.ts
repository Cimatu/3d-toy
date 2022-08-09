import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import Detail from '../deltails.entity';
import { BodiesController } from './car-bodies.controller';
import BodyCar from './car-bodies.entity';
import { BodiesService } from './car-bodies.service';


@Module({
  controllers: [BodiesController],
  providers: [BodiesService],
  imports: [
    TypeOrmModule.forFeature([BodyCar, Car, Detail]),
  ],
  exports: [
    BodiesService
  ]
})
export default class CarBodiesModule { }
