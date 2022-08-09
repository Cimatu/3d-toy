
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import BallBearingSet from './ball-bearing.entity';


@Injectable()
export class BallBearingService {
    constructor(
        @InjectRepository(BallBearingSet)
        private readonly ballBearingRepository: Repository<BallBearingSet>,
    ) { }

    async createSet() {
        return await this.ballBearingRepository.save({});
    }

    async getAll() {
        return await this.ballBearingRepository
            .createQueryBuilder('ball_bearing_set')
            .getMany();
    }
}
