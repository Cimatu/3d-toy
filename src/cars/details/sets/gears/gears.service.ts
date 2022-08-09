
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import Gear from './gears.entity';


@Injectable()
export class GearsService {
    constructor(
        @InjectRepository(Gear)
        private readonly gearRepository: Repository<Gear>,
    ) { }

    async createGear(dto: {price: number, name: string}) {
        return await this.gearRepository.save(dto);
    }

    async getAll() {
        return await this.gearRepository
            .createQueryBuilder('gears')
            .getMany();
    }
}
