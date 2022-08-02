import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Spoiler from './spoilers.entity';


@Injectable()
export class SpoilersService {
    constructor(
        @InjectRepository(Spoiler)
        private readonly spoilerRepository: Repository<Spoiler>,
    ) { }

    async createSpoiler(dto: CreateDetailDto) {
        return await this.spoilerRepository.save(dto);
    }

    async getAllSpoilers() {
        return await this.spoilerRepository.find();
    }

    async getSpoilerByName(name: string) {
        const spoiler = await this.spoilerRepository
            .createQueryBuilder('spoilers')
            .where('spoilers.name = :name', { name })
            .getOne();
        if (!spoiler) {
            throw new NotFoundException("Spoiler not found");
        }
        return spoiler;
    }
}
