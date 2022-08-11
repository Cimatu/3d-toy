
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGearDto } from './dto/create-gears.dto';
import Gear from './gears.entity';


@Injectable()
export class GearsService {
    constructor(
        @InjectRepository(Gear)
        private readonly gearRepository: Repository<Gear>,
    ) { }

    async createGear(dto: CreateGearDto) {
        return await this.gearRepository.save(dto);
    }

    async getAll() {
        return await this.gearRepository
            .createQueryBuilder('gears')
            .getMany();
    }
}
