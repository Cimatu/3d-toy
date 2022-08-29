import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CylindersController } from './cylinders.controller';
import { CylindersService } from './cylinders.service';
import Cylinder from './cylinders.entity';


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
