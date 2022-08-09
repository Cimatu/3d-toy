import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from '../dto/create-detail.dto';
import BodyCar from './car-bodies.entity';
import { BodiesService } from './car-bodies.service';


@ApiTags('Bodies')
@Controller('car-bodies')
export class BodiesController {

    constructor(private bodiesService: BodiesService) { }

    @ApiOperation({ summary: 'Body creation' })
    @ApiResponse({ status: 200, type: BodyCar })
    @Post('create')
    create(@Body() toningDto: { price: number, name: string, dimmensions: string }) {
        return this.bodiesService.createBody(toningDto);
    }

    @ApiOperation({ summary: `Get list of all bodies` })
    @ApiResponse({ status: 200, type: [BodyCar] })
    @Get('get_all')
    getAll() {
        return this.bodiesService.getAll();
    }

    @ApiOperation({ summary: `Get car body by name` })
    @ApiResponse({ status: 200, type: BodyCar })
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.bodiesService.getBodyByName(name);
    }
}
