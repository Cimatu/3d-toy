import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Car } from './cars.entity';
import { DetailsService } from './details/details.service';
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
        const { username, details } = dto;

        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }

        let checkBody = false;
        for (let i = 0; i < details.length; i++) {
            if (details[i].type === "BodyCar") {
                checkBody = true;
                break;
            }
        }
        if (!checkBody) {
            throw new HttpException("Body not found", HttpStatus.NOT_FOUND);
        }

        const detailsObjs = await Promise.all(
            details.map(async (el) => await this.detailsService.getDetailByName(el.name))
        )
        const car = await this.carRepository.create({ user, details: detailsObjs })

        return await this.carRepository.save(car);
    }

    async updateCar(dto: UpdateCarDto) {
        const { carId, details } = dto;

        const car = await this.getCarById(carId);
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }

        const detailsObjs = await Promise.all(
            details.map(async (el) => await this.detailsService.getDetailByName(el.name))
        );
        if (!details.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }
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

    async getAllCars(username: string) {
        const user = await this.userService.getUserByUsername(username);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        const car = await this.carRepository
            .createQueryBuilder('cars')
            .leftJoinAndSelect('cars.details', 'details')
            .leftJoin('cars.user', 'user')
            .where('user.username = :username', { username })
            .getMany();
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return car;
    }
}
