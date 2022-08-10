import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';
import { Event } from './events.entity';
import { EventsService } from './events.service';
import { UserData } from './usersData/usersData.entity';


@Module({
    controllers: [EventController],
    providers: [EventsService],
    imports: [
        TypeOrmModule.forFeature([Event, UserData]),
    ],
    exports: [
        EventsService
    ]

})
export default class EventsModule { }
