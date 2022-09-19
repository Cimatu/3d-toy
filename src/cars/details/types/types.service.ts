import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './types.entity';



@Injectable()
export class TypesService {
    constructor(
        @InjectRepository(Type)
        private readonly typeRepository: Repository<Type>,
    ) { }

    async createType(dto: CreateTypeDto) {
        const checkName = await this.getTypeByName(dto.name);
        if (checkName) {
            throw new HttpException("Type with such name already exists", HttpStatus.FORBIDDEN);
        }
        return await this.typeRepository.save(dto);
    }

    async updateType(id: number, dto: UpdateTypeDto) {
        const type = await this.getTypeById(id);
        if (!type) {
            throw new HttpException("Type not found", HttpStatus.NOT_FOUND);
        }
        const checkName = await this.getTypeByName(dto.name);
        if (checkName && type.id !== checkName.id) {
            throw new HttpException("Type with such name already exists", HttpStatus.FORBIDDEN);
        }

        await this.typeRepository
            .createQueryBuilder()
            .update(Type)
            .set(dto)
            .where("id = :id", { id })
            .execute()
    }

    async getTypeByName(name: string) {
        return await this.typeRepository
            .createQueryBuilder('types')
            .where('types.name = :name', { name })
            .leftJoinAndSelect('types.details', 'details')
            .getOne();
    }

    async getDetailsByTypesIds(ids: number[]) {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.typeRepository
                    .createQueryBuilder('types')
                    .leftJoinAndSelect('types.details', 'details')
                    .where('types.id = :id', { id })
                    .getMany();
            })
        )
    }

    async getTypeById(id: number) {
        return await this.typeRepository
            .createQueryBuilder('types')
            .where('types.id = :id', { id })
            .getOne();
    }

    async detleteType(id: number) {
        let type = await this.getTypeById(id);
        if (!type) {
            throw new HttpException("Type not found", HttpStatus.NOT_FOUND);
        }
        await this.typeRepository.delete(id);
        type = await this.getTypeById(id);
        if (!type) {
            return { message: "Type was successfuly deleted" }
        } else {
            return { message: "Type wasn't deleted" }
        }
    }

    async getAllTypes() {
        return await this.typeRepository
            .createQueryBuilder('types')
            .getMany();
    }
}
