import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import Detail from '../deltails.entity';
import { BodiesController } from './bodies.controller';
import CarBody from './bodies.entity';
import { BodiesService } from './bodies.service';


@Module({
  controllers: [BodiesController],
  providers: [BodiesService],
  imports: [
    TypeOrmModule.forFeature([CarBody, Car, Detail]),
  ],
  exports: [
    BodiesService
  ]
})
export default class BodiesModule { }
