import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from 'src/users/users.entity';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';



@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    @ApiOperation({ summary: 'Car creation' })
    @ApiResponse({ status: 200, type: Car })
    @Post('create')
    create(@Body() dto: CreateCarDto) {
        return this.carsService.createCar(dto);
    }

    @ApiOperation({ summary: 'Update creation' })
    @ApiResponse({ status: 200, type: Car })
    @Post('update')
    update(@Body() dto: UpdateCarDto) {
        return this.carsService.updateCar(dto)
    }

    @ApiOperation({ summary: 'Find all cars' })
    @ApiResponse({ status: 200, type: [Car] })
    @Get('all_cars')
    findAllCars(@Body() body: { userId: number }) {
        return this.carsService.getAllCars(body.userId)
    }

    @ApiOperation({ summary: 'Find all cars' })
    @ApiResponse({ status: 200 })
    @Delete('delete_car/:car_id')
    deleteCar(@Param('car_id') car_id: number) {
        return this.carsService.deleteCar(car_id)
    }
}

