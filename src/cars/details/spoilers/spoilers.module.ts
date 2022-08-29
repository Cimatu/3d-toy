import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from 'src/cars/cars.entity';
import { SpoilersController } from './spoilers.controller';
import Spoiler from './spoilers.entity';
import { SpoilersService } from './spoilers.service';



@Module({
  controllers: [SpoilersController],
  providers: [SpoilersService],
  imports: [
    TypeOrmModule.forFeature([Spoiler]),
  ],
  exports: [
    SpoilersService
  ]
})
export default class SpoilersModule { }
