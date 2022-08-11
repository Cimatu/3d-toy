import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CylindersController } from './cylinders.controller';
import Cylinder from './cylinders.entity';
import { CylindersService } from './cylinders.service';


@Module({
  controllers: [CylindersController],
  providers: [CylindersService],
  imports: [
    TypeOrmModule.forFeature([Cylinder]),
  ],
  exports: [
  ]
})
export default class CylindersModule { }