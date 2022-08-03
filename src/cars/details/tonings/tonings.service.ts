import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Toning from './tonings.entity';


@Injectable()
export class ToningsService {
    constructor(
        @InjectRepository(Toning)
        private readonly toningRepository: Repository<Toning>,
    ) { }

    async createToning(dto: CreateDetailDto) {
        return await this.toningRepository.save(dto);

    }

    async getAllTonings() {
        return await this.toningRepository.find();
    }

    async getToningByName(name: string) {
        const toning = await this.toningRepository
            .createQueryBuilder('tonings')
            .where('tonings.name = :name', { name })
            .getOne();
        if (!toning) {
            throw new HttpException("Toning not found", HttpStatus.NOT_FOUND);
        }
        return toning;
    }
}
