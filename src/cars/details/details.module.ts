import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../cars.entity';
import Detail from './deltails.entity';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import Gear from './sets/gears/gears.entity';


@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  imports: [
    TypeOrmModule.forFeature([Detail, Car, Gear]),
  ],
  exports: [
    DetailsService
  ]
})
export default class DetailsModule { }