import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';
import { Type } from './types.entity';


@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [
    TypeOrmModule.forFeature([Type]),
  ],
  exports: [
    TypesService
  ]
})
export default class TypesModule { }
