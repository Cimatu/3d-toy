import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Spacer from './spacers.entity';
import { CreateSpaerDto } from './dto/create-spacer.dto';


@Injectable()
export class SpacersService {
    constructor(
        @InjectRepository(Spacer)
        private readonly spacerRepository: Repository<Spacer>,
    ) { }

    async createSpacer(dto: CreateSpaerDto) {
        return await this.spacerRepository.save(dto);
    }

    async getAll() {
        return await this.spacerRepository
            .createQueryBuilder('spacers')
            .getMany();
    }
}
