import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './events.entity';
import { EventsService } from './events.service';


@ApiTags('Events')
@Controller('events')
export class EventController {

    constructor(private eventsService: EventsService) { }

    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, type: Event })
    @Post('create')
    create(@Body() eventDto: CreateEventDto) {
        return this.eventsService.createEvent(eventDto);
    }
}
