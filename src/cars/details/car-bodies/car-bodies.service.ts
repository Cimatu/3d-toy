import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import BodyCar from './car-bodies.entity';


@Injectable()
export class BodiesService {
    constructor(
        @InjectRepository(BodyCar)
        private readonly bodyRepository: Repository<BodyCar>,
    ) { }

    async createBody(dto: { price: number, name: string, dimmensions: string }) {
        return await this.bodyRepository.save(dto);
    }

    async getAll() {
        return await this.bodyRepository.find();
    }

    async getBodyByName(name: string) {
        const body = await this.bodyRepository
            .createQueryBuilder('car-bodies')
            .where('car-bodies.name = :name', { name })
            .getOne();
        if (!body) {
            throw new HttpException("Body not found", HttpStatus.NOT_FOUND);
        }
        return body;
    }
}
