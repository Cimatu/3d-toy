
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import Detail from './deltails.entity';
import Gear from './sets/gears/gears.entity';


@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(Detail)
        private readonly detailRepository: Repository<Detail>,
    ) { }

    async createDetail() {
        return await this.detailRepository.save({});
    }

    async getDetailByName(name: string) {
        const detail = await this.detailRepository
            .createQueryBuilder('details')
            .where('details.name = :name', { name })
            .getOne();
        return detail
    }

    async getAllDetails() {
        return await this.detailRepository
            .createQueryBuilder()
            .select('details')
            .from(Detail, 'details')
            .getMany();
    }

    async filterDetails(types: string[]) {
        const details = await this.detailRepository
            .createQueryBuilder()
            .select('details')
            .from(Detail, 'details')
            .getMany();

        return details.filter((el) => {
            for (let i = 0; i < types.length; i++) {
                if (el.type == types[i]) {
                    return el;
                }
            }
        })
    }
}

