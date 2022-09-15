import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from './deltails.entity';
import { CreateDetailDto } from './dto/create-detail.dto';


@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(Detail)
        private readonly detailRepository: Repository<Detail>,
    ) { }

    async createDetail(dto: CreateDetailDto) {
        const detail = await this.detailRepository.create(dto)
        if (!detail) {
            throw new HttpException("Video not found", HttpStatus.NOT_FOUND);
        }
        return await this.detailRepository.save(detail);
    }

    async getDetailByName(name: string) {
        return await this.detailRepository
            .createQueryBuilder('details')
            .where('details.name = :name', { name })
            .getOne();
    }

    async getDetailsByColor(color: string) {
        return await this.detailRepository
            .createQueryBuilder('details')
            .where('details.color = :color', { color })
            .getMany();
    }

    async getDetailsTypesList() {
        const details = await this.getAllDetails();

        let types = details.map(el => el.type);

        const set = new Set(types);

        return [...set];
    }

    async filterDetails(details: [Detail], types: string[]) {
        return details.filter((el) => {
            for (let i = 0; i < types.length; i++) {
                console.log(el)
                if (el.type == types[i]) {
                    return el;
                }
            }
        })
    }

    async filterByPrice(details: [Detail], min: number, max: number) {
        return details.filter((el) => {
            if (el.price >= min && el.price <= max) {
                return el;
            }
        })
    }

    async getAllDetails() {
        return await this.detailRepository
            .createQueryBuilder('details')
            .getMany();
    }
}
