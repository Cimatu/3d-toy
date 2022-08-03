import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Car } from './cars.entity';
import { BodiesService } from './details/bodies/bodies.service';
import { SpoilersService } from './details/spoilers/spoilers.service';
import { ToningsService } from './details/tonings/tonings.service';
import { WheelsService } from './details/wheels/wheels.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        private userService: UsersService,
        private wheelService: WheelsService,
        private bodyService: BodiesService,
        private toningService: ToningsService,
        private spoilerService: SpoilersService
    ) { }

    async createCar(dto: CreateCarDto) {
        const { body, wheel, spoiler, toning } = dto.details;
        const user = await this.userService.getUserByUsername(dto?.username);

        if (!user || !body) {
            throw new HttpException("User or body not found", HttpStatus.NOT_FOUND);
        }

        const car = new Car();
        car.user = user;

        if (body) {
            const bodies = await this.bodyService.getBodyByName(body);
            car.bodies = [bodies];
        }

        if (toning) {
            const tonings = await this.toningService.getToningByName(toning);
            car.tonings = [tonings];
        }

        if (spoiler) {
            const spoilers = await this.spoilerService.getSpoilerByName(spoiler);
            car.spoilers = [spoilers];
        }

        if (wheel) {
            const wheels = await this.wheelService.getWheelByName(wheel);
            car.wheels = [wheels];
        }

        return await this.carRepository.save(car);
    }

    async updateCar(dto: UpdateCarDto) {
        const { body, wheel, spoiler, toning } = dto.details;

        const car = await this.getCarById(dto?.carId);

        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }

        if (body) {
            const bodies = await this.bodyService.getBodyByName(body);
            car.bodies = [bodies];
        }

        if (toning) {
            const tonings = await this.toningService.getToningByName(toning);
            car.tonings = [tonings];
        }

        if (spoiler) {
            const spoilers = await this.spoilerService.getSpoilerByName(spoiler);
            car.spoilers = [spoilers];
        }

        if (wheel) {
            const wheels = await this.wheelService.getWheelByName(wheel);
            car.wheels = [wheels];
        }

        return await this.carRepository.save(car) 
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
            .leftJoinAndSelect('cars.bodies', 'bodies')
            .leftJoinAndSelect('cars.spoilers', 'spoilers')
            .leftJoinAndSelect('cars.tonings', 'tonings')
            .leftJoinAndSelect('cars.wheels', 'wheels')
            .leftJoinAndSelect('cars.user', 'user')
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
            .leftJoinAndSelect('cars.bodies', 'bodies')
            .leftJoinAndSelect('cars.spoilers', 'spoilers')
            .leftJoinAndSelect('cars.tonings', 'tonings')
            .leftJoinAndSelect('cars.wheels', 'wheels')
            .leftJoin('cars.user', 'user')
            .where('user.username = :username', { username })
            .getMany();
        if (!car) {
            throw new HttpException("Car not found", HttpStatus.NOT_FOUND);
        }
        return car;
    }
}
