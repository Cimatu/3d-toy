
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Detail from './deltails.entity';


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
        return await this.detailRepository
            .createQueryBuilder('details')
            .where('details.name = :name', { name })
            .getOne();
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

