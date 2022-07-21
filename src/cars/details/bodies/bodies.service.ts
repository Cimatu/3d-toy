import { Injectable } from '@nestjs/common';
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
        return await this.bodyRepository.findOneBy({ name });
    }
}
