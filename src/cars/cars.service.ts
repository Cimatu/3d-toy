import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { DetailsService } from './details/details.service';
import { Car } from './cars.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        private userService: UsersService,
        private detailsService: DetailsService,
    ) { }

    async createCar(dto: CreateCarDto) {
        const { userId, detailsIds } = dto;

        const user = await this.userService.getUserById(userId);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        const detailsObjs = await Promise.all(
            detailsIds.map(async (el) => await this.detailsService.getDetailById(el))
        )
        let checkBody = false;
        for (let i = 0; i < detailsObjs.length; i++) {
            if (detailsObjs[i].type.name == "CarBody") {
                checkBody = true;
                break;
            }
        }
        if (!checkBody) {
            throw new HttpException("Body not found", HttpStatus.NOT_FOUND);
        }

        const car = await this.carRepository.create({ user, details: detailsObjs })

        return await this.carRepository.save(car);
    }

    async updateCar(dto: UpdateCarDto) {
        const { carId, detailsIds } = dto;

        const car = await this.getCarById(carId);
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }

        if (!detailsIds.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }
        const detailsObjs = await Promise.all(
            detailsIds.map(async (el) => await this.detailsService.getDetailById(el))
        );
        car.details = detailsObjs;
            
        return await this.carRepository.save(car);
    }

    async deleteCar(id: number) {
        const car = this.getCarById(id);
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return await this.carRepository.delete(id);
    }

    async getCarById(id: number) {
        const car = await this.carRepository
            .createQueryBuilder('cars')
            .leftJoinAndSelect('cars.details', 'details')
            .where('cars.id = :id', { id })
            .getOne();
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return car;
    }

    async getAllCars(id: number) {
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const car = await this.carRepository
            .createQueryBuilder('cars')
            .leftJoinAndSelect('cars.details', 'details')
            .leftJoin('cars.user', 'user')
            .where('user.id = :id', { id })
            .getMany();
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return car;
    }
}
