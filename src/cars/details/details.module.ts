import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../cars.entity';
import Detail from './deltails.entity';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';


@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  imports: [
    TypeOrmModule.forFeature([Detail, Car]),
  ],
  exports: [
    DetailsService
  ]
})
export default class DetailsModule { }