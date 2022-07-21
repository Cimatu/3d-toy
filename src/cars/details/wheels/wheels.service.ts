import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Wheel from './wheels.entity';


@Injectable()
export class WheelsService {

    constructor(
        @InjectRepository(Wheel)
        private readonly wheelRepository: Repository<Wheel>,
    ) { }

    async createWheel(dto: CreateDetailDto) {
        return await this.wheelRepository.save(dto);
    }

    async getAllWheels() {
        return await this.wheelRepository.find();
    }

    async getWheelByName(name: string) {
        return await this.wheelRepository.findOneBy({ name });
    }
}
