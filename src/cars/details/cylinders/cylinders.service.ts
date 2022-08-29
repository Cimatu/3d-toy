import { Injectable } from '@nestjs/common';
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

    async getAllCylinders() {
        return await this.cylinderRepository
            .createQueryBuilder('cylinders')
            .getMany();
    }
}
