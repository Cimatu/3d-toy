import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository, DataSource } from 'typeorm';
import { Car } from './cars.entity';
import { BodiesService } from './details/bodies/bodies.service';
import { CreateDetailDto } from './details/dto/create-detail.dto';
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
        // @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        private wheelService: WheelsService,
        private bodyService: BodiesService,
        private toningService: ToningsService,
        private spoilerService: SpoilersService
    ) { }


    async createCar(dto: CreateCarDto) {
        const { body, wheel, spoiler, toning } = dto.details;
        const user = await this.userService.getUserById(dto?.userId);

        if (!user || !body) {
            return new Error('Choose body')
        }

        const car = new Car();
        car.user = user;

        if (body) {
            const bodies = await this.bodyService.getBodyByName(body);
            car.bodies = [bodies];
        }

        if (toning) {
            const tonings = await this.toningService.getToningByName(toning)
            car.tonings = [tonings]
        }

        if (spoiler) {
            const spoilers = await this.spoilerService.getSpoilerByName(spoiler)
            car.spoilers = [spoilers]
        }

        if (wheel) {
            const wheels = await this.wheelService.getWheelByName(wheel)
            car.wheels = [wheels]
        }

        await this.carRepository.save(car);
        return car;
    }

    async updateCar(dto: UpdateCarDto) {
        const { body, wheel, spoiler, toning } = dto.details;
        const car = await this.getCarById(dto?.carId);

        if (!car) {
            throw new Error("Car doesn't chosen")
        }

        if (body) {
            const bodies = await this.bodyService.getBodyByName(body);
            car.bodies = [bodies];
        }

        if (toning) {
            const tonings = await this.toningService.getToningByName(toning)
            car.tonings = [tonings]
        }

        if (spoiler) {
            const spoilers = await this.spoilerService.getSpoilerByName(spoiler)
            car.spoilers = [spoilers]
        }

        if (wheel) {
            const wheels = await this.wheelService.getWheelByName(wheel)
            car.wheels = [wheels]
        }

        await this.carRepository.save(car);
        return car;
    }

    async deleteCar(car_id: number) {
        console.log(car_id)
        const car = await this.getCarById(car_id);
        if (!car) {
            throw new Error("Car doesn't exist")
        }
        return await this.carRepository.remove(car);
    }

    async getCarById(id) {
        if (id) {
            return await this.carRepository.findOneBy({ id })
        } else {
            return undefined
        }
    }

    async getAllCars(userId: number) {
        const user = await this.userService.getUserById(userId);
        if(!user){
            throw new Error("User doesn't exist")
        }
        const car = await this.carRepository.find({ where: { user } });
        return car;
    }
}
