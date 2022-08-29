import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BodyCar from './car-bodies.entity';
import { CreateCarBodyDto } from './dto/create-car-body.dto';


@Injectable()
export class BodiesService {
    constructor(
        @InjectRepository(BodyCar)
        private readonly bodyRepository: Repository<BodyCar>,
    ) { }

    async createBody(dto: CreateCarBodyDto) {
        return await this.bodyRepository.save(dto);
    }

    async getAllBodies() {
        return await this.bodyRepository
            .createQueryBuilder('car-bodies')
            .getMany();
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
