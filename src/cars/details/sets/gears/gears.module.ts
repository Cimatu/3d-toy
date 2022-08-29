import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GearsController } from './gears.controller';
import { GearsService } from './gears.service';
import Gear from './gears.entity';


@Module({
  controllers: [GearsController],
  providers: [GearsService],
  imports: [
    TypeOrmModule.forFeature([Gear]),
  ],
  exports: [
  ]
})
export default class GearsModule { }
