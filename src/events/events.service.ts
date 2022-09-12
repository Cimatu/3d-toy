import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';


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

    async updateEventById(id: number, eventData: UpdateEventDto) {
        const {name, description, date, img } = eventData;

        const event = await this.getEventById(id);
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

    async deleteEventById(id: number) {
        let event = await this.getEventById(id);
        if (!event) {
            throw new HttpException("Event not found", HttpStatus.NOT_FOUND);
        }
        await this.eventsRepository.delete(id);
        event = await this.getEventById(id);
        if(!event){
            return {message: "Event was successfuly deleted"}
        }else{
            return {message: "FAQ wasn't deleted"}
        }
    }

    async getAllEvents() {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .getMany();
    }

    async getEventById(id: number) {
        return await this.eventsRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.usersData', 'usersData')
            .where('events.id = :id', { id })
            .getOne();
    }
}
