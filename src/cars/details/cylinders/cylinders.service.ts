import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Cylinder from './cylinders.entity';
import { CreateCylinderDto } from './dto/create-cylinders.dto';


@Injectable()
export class CylindersService {
    constructor(
        @InjectRepository(Cylinder)
        private readonly cylinderRepository: Repository<Cylinder>,
    ) { }

    async createCylinder(dto: CreateCylinderDto) {
        return await this.cylinderRepository.save(dto);
    }

    async getAll() {
        return await this.cylinderRepository.find();
    }

    // async getBodyByName(name: string) {
    //     const body = await this.bodyRepository
    //         .createQueryBuilder('car-bodies')
    //         .where('car-bodies.name = :name', { name })
    //         .getOne();
    //     if (!body) {
    //         throw new HttpException("Body not found", HttpStatus.NOT_FOUND);
    //     }
    //     return body;
    // }
}
