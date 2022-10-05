import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

class DeleteResponse {
    @ApiProperty({ example: 'FAQ was successfuly deleted' })
    message: string;
}


@ApiTags('Events')
@Controller('events')
export class EventController {

    constructor(private eventsService: EventsService) { }

    @ApiOperation({ summary: 'Create event' })
    @ApiResponse({ status: 200, type: Event })
    @Post('create')
    create(@Body() dto: CreateEventDto) {
        return this.eventsService.createEvent(dto);
    }

    @ApiOperation({ summary: 'Update event by id' })
    @ApiResponse({ status: 200, type: Event })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() dto: UpdateEventDto) {
        return this.eventsService.updateEventById(id, dto);
    }

    @ApiOperation({ summary: 'Delete event by id' })
    @ApiResponse({ status: 200, type: DeleteResponse })
    @Delete('delete/:id')
    detele(@Param('id') id: number) {
        return this.eventsService.deleteEventById(id);
    }

    @ApiOperation({ summary: 'Get events list' })
    @ApiResponse({ status: 200, type: [Event] })
    @Get('get_all')
    getAll() {
        return this.eventsService.getAllEvents();
    }

    @ApiOperation({ summary: 'Get events list with user data of current user' })
    @ApiResponse({ status: 200, type: [Event] })
    @Get('get_all_events_by/:userId')
    getAllEventsWithUserId(@Param('userId') userId: number) {
        return this.eventsService.getAllEventsWithUserId(userId);
    }   

    @ApiOperation({ summary: 'Get one single event by its id' })
    @ApiResponse({ status: 200, type: Event })
    @Get('get_one/:id')
    getOneById(@Param('id') id: number) {
        return this.eventsService.getEventById(id);
    }
}
