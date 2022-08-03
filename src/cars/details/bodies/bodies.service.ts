import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import CarBody from './bodies.entity';


@Injectable()
export class BodiesService {
    constructor(
        @InjectRepository(CarBody)
        private readonly bodyRepository: Repository<CarBody>,
    ) { }

    async createBody(dto: CreateDetailDto) {
        return await this.bodyRepository.save(dto);
    }

    async getAllBodies() {
        return await this.bodyRepository.find();
    }

    async getBodyByName(name: string) {
        const body = await this.bodyRepository
            .createQueryBuilder('bodies')
            .where('bodies.name = :name', { name })
            .getOne();
        if (!body) {
            throw new HttpException("Body not found", HttpStatus.NOT_FOUND);
        }
        return body;
    }
}
