import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BallBearingController } from './ball-bearing.controller';
import { BallBearingService } from './ball-bearing.service';
import BallBearingSet from './ball-bearing.entity';


@Module({
  controllers: [BallBearingController],
  providers: [BallBearingService],
  imports: [
    TypeOrmModule.forFeature([BallBearingSet]),
  ],
  exports: [
  ]
})
export default class BallBearingModule { }
