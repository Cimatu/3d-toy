import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Car } from './cars.entity';
import { CarsService } from './cars.service';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private carsService: CarsService) { }

    @ApiOperation({ summary: 'Car creation' })
    @ApiResponse({ status: 200, type: Car })
    @Post('create')
    create() {
        return this.carsService.createCar();
    }
}
