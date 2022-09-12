import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { Video } from './video.entity';
import { VideoService } from './video.service';


@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [
    TypeOrmModule.forFeature([Video]),
  ],
})
export default class VideoModule { }
