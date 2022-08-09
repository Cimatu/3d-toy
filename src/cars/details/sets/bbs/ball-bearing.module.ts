import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { BallBearingController } from './ball-bearing.controller';
import BallBearingSet from './ball-bearing.entity';
import { BallBearingService } from './ball-bearing.service';


@Module({
  controllers: [BallBearingController],
  providers: [BallBearingService],
  imports: [
    TypeOrmModule.forFeature([BallBearingSet, Car]),
  ],
  exports: [
  ]
})
export default class BallBearingModule { }