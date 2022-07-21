import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from './cars.entity';
import { WheelsService } from './details/wheels/wheels.service';

@Injectable()
export class CarsService {
    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>,
        private wheelService: WheelsService,
    ) { }

    async createCar() {
        const car = new Car()
        const wheels = await this.wheelService.getWheelByName('Default');
        // const body = await this.
        car.wheels.push(wheels)
        console.log(wheels)
        await this.carRepository.save(car)
        return car;
    }

    async getAllCars() {
        const car = await this.carRepository.find();
        return car;
    }
}
