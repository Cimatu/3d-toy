
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Gear from './gears.entity';
import { CreateGearDto } from './dto/create-gears.dto';


@Injectable()
export class GearsService {
    constructor(
        @InjectRepository(Gear)
        private readonly gearRepository: Repository<Gear>,
    ) { }

    async createGear(dto: CreateGearDto) {
        return await this.gearRepository.save(dto);
    }

    async getAllGears() {
        return await this.gearRepository
            .createQueryBuilder('gears')
            .getMany();
    }
}
