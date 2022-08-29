import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodiesController } from './car-bodies.controller';
import { BodiesService } from './car-bodies.service';
import BodyCar from './car-bodies.entity'


@Module({
  controllers: [BodiesController],
  providers: [BodiesService],
  imports: [
    TypeOrmModule.forFeature([BodyCar]),
  ],
  exports: [
    BodiesService
  ]
})
export default class CarBodiesModule { }
