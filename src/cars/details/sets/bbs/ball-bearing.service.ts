import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BallBearingSet from './ball-bearing.entity';
import { CreateBBSDto } from './dto/create-bbs.dto';


@Injectable()
export class BallBearingService {
    constructor(
        @InjectRepository(BallBearingSet)
        private readonly ballBearingRepository: Repository<BallBearingSet>,
    ) { }

    async createSet(dto: CreateBBSDto) {
        return await this.ballBearingRepository.save(dto);
    }

    async getAll() {
        return await this.ballBearingRepository
            .createQueryBuilder('ball_bearing_set')
            .getMany();
    }
}
