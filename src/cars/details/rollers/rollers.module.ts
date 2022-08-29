import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RollersController } from './rollers.controller';
import { RollersService } from './rollers.service';
import Roller from './rollers.entity';


@Module({
    controllers: [RollersController],
    providers: [RollersService],
    imports: [
        TypeOrmModule.forFeature([Roller]),
    ],
    exports: [
    ]
})
export default class RollersModule { }
