import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import Detail from './deltails.entity';
import { Car } from '../cars.entity';


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
