import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';
import { EventsService } from './events.service';
import { Event } from './events.entity';
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
