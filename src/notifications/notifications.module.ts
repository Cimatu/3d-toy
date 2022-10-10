import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notifications.entity';
import { NotificationsService } from './notifications.service';


@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    TypeOrmModule.forFeature([Notification]),
  ],
  
})
export default class NotificationsModule { }
