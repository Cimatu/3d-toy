import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { Car } from './cars.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    @ApiOperation({ summary: 'Create car', description: "You can't create new car without detail with type 'CarBody'" })
    @ApiResponse({ status: 200, type: Car })
    @Post('create')
    create(@Body() dto: CreateCarDto) {
        return this.carsService.createCar(dto);
    }

    @ApiOperation({ summary: 'Update car' })
    @ApiResponse({ status: 200, type: Car })
    @Post('update')
    update(@Body() dto: UpdateCarDto) {
        return this.carsService.updateCar(dto)
    }

    @ApiOperation({ summary: 'Find all cars of user by user id {userId}' })
    @ApiResponse({ status: 200, type: [Car] })
    @Get('get_all')
    findAllCars(@Query('userId') userId: number) {
        return this.carsService.getAllCars(userId)
    }

    @ApiOperation({ summary: 'Get car by id' })
    @ApiResponse({ status: 200, type: Car })
    @Get('get_by_id/:car_id')
    findOneCar(@Param('car_id') car_id: number) {
        return this.carsService.getCarById(car_id)
    }

    @ApiOperation({ summary: 'Delete car by id' })
    @ApiResponse({ status: 200 })
    @Post('delete_by_id/:car_id')
    deleteCar(@Param('car_id') car_id: number) {
        return this.carsService.deleteCar(car_id)
    }
}

