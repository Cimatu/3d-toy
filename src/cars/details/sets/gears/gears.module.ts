import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { GearsController } from './gears.controller';
import Gear from './gears.entity';
import { GearsService } from './gears.service';


@Module({
  controllers: [GearsController],
  providers: [GearsService],
  imports: [
    TypeOrmModule.forFeature([Gear, Car]),
  ],
  exports: [
  ]
})
export default class GearsModule { }