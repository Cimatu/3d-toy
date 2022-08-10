import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './events.entity';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,
    ) { }


    async createEvent(eventsData: CreateEventDto) {
        const event = await this.eventsRepository.create(eventsData)
        if (!event) {
            throw new HttpException("Event wasn't created", HttpStatus.NOT_FOUND);
        }
        return await this.eventsRepository.save(event);
    }

    async updateEvent(eventData: UpdateEventDto) {
        const { eventId, name, description, date, img } = eventData;
        const event = await this.getEventById(eventId);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        if (name) {
            event.name = eventData.name;
        }
        if (description) {
            event.description = eventData.description;
        }
        if (img) {
            event.img = eventData.img;
        }
        if (date) {
            event.date = eventData.name;
        }
        return await this.eventsRepository.save(event);
    }

    async getEventById(id: number) {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .where('events.id = :id', { id })
            .getOne();
    }

    async getAllEvents() {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .getMany();
    }

    async deleteEventById(id: number) {
        const event = await this.getEventById(id);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        return await this.eventsRepository.delete(id);
    }

}
