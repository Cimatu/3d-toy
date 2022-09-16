import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailsController } from './details.controller';
import { DetailsService } from './details.service';
import { Detail } from './deltails.entity';
import { Car } from '../cars.entity';
import { Type } from './types/types.entity';
import TypesModule from './types/types.module';


@Module({
  controllers: [DetailsController],
  providers: [DetailsService],
  imports: [
    TypeOrmModule.forFeature([Detail, Car, Type]),
    TypesModule
  ],
  exports: [
    DetailsService
  ]
})
export default class DetailsModule { }
