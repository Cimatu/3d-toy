import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { ToningsController } from './tonings.controller';
import Toning from './tonings.entity';
import { ToningsService } from './tonings.service';

@Module({
  controllers: [ToningsController],
  providers: [ToningsService],
  imports: [
    TypeOrmModule.forFeature([Toning, Car]),
  ],
  exports: [
    ToningsService
  ]
})
export default class ToningsModule { }
