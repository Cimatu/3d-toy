import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    @ApiOperation({ summary: 'Create car' })
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

    @ApiOperation({ summary: 'Find all cars' })
    @ApiResponse({ status: 200, type: [Car] })
    @Get('get_all')
    findAllCars(@Body() body: { username: string }) {
        return this.carsService.getAllCars(body.username)
    }

    @ApiOperation({ summary: 'Get car by id' })
    @ApiResponse({ status: 200, type: Car })
    @Get('get_by_id/:car_id')
    findOneCar(@Param('car_id') car_id: number ) {
        return this.carsService.getCarById(car_id)
    }

    @ApiOperation({ summary: 'Delete car by id' })
    @ApiResponse({ status: 200 })
    @Delete('delete_by_id/:car_id')
    deleteCar(@Param('car_id') car_id: number) {
        console.log(car_id)
        return this.carsService.deleteCar(car_id)
    }
}

