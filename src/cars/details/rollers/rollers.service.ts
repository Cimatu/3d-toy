
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Roller from './rollers.entity';
import { CreateRollerDto } from './dto/create-roller.dto';


@Injectable()
export class RollersService {
    constructor(
        @InjectRepository(Roller)
        private readonly rollerRepository: Repository<Roller>,
    ) { }

    async createRoller(dto: CreateRollerDto) {
        return await this.rollerRepository.save(dto);
    }

    async getAllRollers() {
        return await this.rollerRepository
            .createQueryBuilder('rollers')
            .getMany();
    }
}
