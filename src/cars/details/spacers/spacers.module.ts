import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacersController } from './spacers.controller';
import { SpacersService } from './spacers.service';
import Spacer from './spacers.entity';

@Module({
    controllers: [SpacersController],
    providers: [SpacersService],
    imports: [
        TypeOrmModule.forFeature([Spacer]),
    ],
})
export default class SpacersModule { }
