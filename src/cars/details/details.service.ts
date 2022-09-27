import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { Detail } from './deltails.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { GetDetailsByPriceDto } from './dto/get-detail-by.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { TypesService } from './types/types.service';


@Injectable()
export class DetailsService {
    constructor(
        @InjectRepository(Detail)
        private readonly detailRepository: Repository<Detail>,
        private typesService: TypesService,
    ) { }

    async createDetail(dto: CreateDetailDto) {
        const checkName = await this.getDetailByName(dto.name);
        if (checkName) {
            throw new HttpException("Detail with such name already exists", HttpStatus.FORBIDDEN);
        }
        const { typeId, name, price, color, dimmensions, img, note } = dto;
        let detailType = await this.typesService.getTypeById(typeId);
        if (!detailType) {
            throw new HttpException("Type not found", HttpStatus.NOT_FOUND);
        }

        const detail = await this.detailRepository.create({ type: detailType, name, price, color, dimmensions, img, note });
        if (!detail) {
            throw new HttpException("Detail not found", HttpStatus.NOT_FOUND);
        }
        return await this.detailRepository.save(detail);
    }

    async updateDetail(id: number, dto: UpdateDetailDto) {
        const detail = await this.getDetailById(id);
        if (!detail) {
            throw new HttpException("Detail not found", HttpStatus.NOT_FOUND);
        }
        const { typeId, name, price, color, dimmensions, img, note } = dto;

        const checkName = await this.getDetailByName(dto.name);
        if (checkName && detail.id !== checkName.id) {
            throw new HttpException("Detail with such name already exists", HttpStatus.FORBIDDEN);
        }

        const newDto = { name, price, color, dimmensions, img, note }
        let detailType = detail.type;
        if (typeId) {
            const checkType = await this.typesService.getTypeById(typeId);
            if (checkType) {
                detailType = checkType;
            }
        }

        await this.detailRepository
            .createQueryBuilder()
            .update(Detail)
            .set({ type: detailType, ...newDto })
            .where("id = :id", { id })
            .execute();
        return await this.getDetailById(id);
    }

    async getDetailsByColor(color: string) {
        return await this.detailRepository
            .createQueryBuilder('details')
            .where('details.color = :color', { color })
            .getMany();
    }

    async filterByPrice(dto: GetDetailsByPriceDto) {
        const { details, min, max } = dto;
        return details.filter((el) => {
            if (el.price >= min && el.price <= max) {
                return el;
            }
        })
    }

    async getDetailByName(name: string) {
        return await this.detailRepository
            .createQueryBuilder('details')
            .leftJoinAndSelect('details.type', 'type')
            .where('details.name = :name', { name })
            .getOne();
    }

    async getDetailById(id: number) {
        return await this.detailRepository
            .createQueryBuilder('details')
            .leftJoinAndSelect('details.type', 'type')
            .where('details.id = :id', { id })
            .getOne();
    }

    async getAllDetails() {
        return await this.detailRepository
            .createQueryBuilder('details')
            .leftJoinAndSelect('details.type', 'type')
            .getMany();
    }

    async getDetailsWithPagination(take: number = 10, skip: number = 0) {
        return from(
            this.detailRepository.findAndCount({ relations: ['type'], take, skip }).then((data) => data)
        );
    }

    async getDetailsByType(ids: number[]) {
        if (ids.length == 0) {
            return await this.getAllDetails();
        }
        const details = await Promise.all(
            ids.map(async (typeId) => {
                return await this.detailRepository
                    .createQueryBuilder('details')
                    .where('details.typeId = :typeId', { typeId })
                    .getMany();
            })
        )
        let newDetails = [];
        for (let i = 0; i < details.length; i++) {
            newDetails = [...newDetails, ...details[i]]
        }
        return newDetails
    }

    async deleteDetailById(id: number) {
        const car = this.getDetailById(id);
        if (!car) {
            throw new HttpException("Detail not found", HttpStatus.NOT_FOUND);
        }
        return await this.detailRepository.delete(id);
    }
}
