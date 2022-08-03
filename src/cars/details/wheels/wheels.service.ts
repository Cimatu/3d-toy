import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Wheel from './wheels.entity';


@Injectable()
export class WheelsService {

    constructor(
        @InjectRepository(Wheel)
        private readonly wheelRepository: Repository<Wheel>,
    ) { }

    async createWheel(dto: CreateDetailDto) {
        const wheel = this.getWheelByName(dto.name);
        if (wheel) {
            throw new HttpException('Wheel alredy exist', HttpStatus.FOUND);
        }
        return await this.wheelRepository.save(dto);
    }

    async updateWheel(dto: CreateDetailDto, id: number) {
        const findWheel = await this.getWheelByName(dto.name);
        if (!findWheel) {
            throw new HttpException("Wheel not found", HttpStatus.NOT_FOUND);
        }

        return await this.wheelRepository
            .createQueryBuilder('wheels')
            .update(Wheel)
            .set({ ...dto })
            .where('wheels.id = :id', { id })
            .returning('*')
            .execute()
            .then((res) => res.raw[0])
    }

    async getAllWheels() {
        return await this.wheelRepository
            .createQueryBuilder('wheels')
            .getMany();
    }

    async getWheelByName(name: string) {
        const wheel = await this.wheelRepository
            .createQueryBuilder('wheels')
            .where('wheels.name = :name', { name })
            .getOne();
        if (!wheel) {
            throw new HttpException("Wheel not found", HttpStatus.NOT_FOUND);
        }
        return wheel;
    }

    async getWheelById(id: number) {
        const wheel = await this.wheelRepository
            .createQueryBuilder('wheels')
            .where('wheels.id = :id', { id })
            .getOne();
        if (!wheel) {
            throw new HttpException("Wheel not found", HttpStatus.NOT_FOUND);
        }
        return wheel;
    }

    async deleteWheel(id: number) {
        const wheel = this.getWheelById(id);
        if (!wheel) {
            throw new HttpException("Wheel not found", HttpStatus.NOT_FOUND);
        }
        return await this.wheelRepository.delete(id);
    }
}
