import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import BodyCar from './car-bodies.entity';
import { BodiesService } from './car-bodies.service';
import { CreateCarBodyDto } from './dto/create-car-body.dto';


@ApiTags('Bodies')
@Controller('car-bodies')
export class BodiesController {

    constructor(private bodiesService: BodiesService) { }

    @ApiOperation({ summary: 'Body creation' })
    @ApiResponse({ status: 200, type: BodyCar })
    @Post('create')
    create(@Body() carBodyDto: CreateCarBodyDto) {
        return this.bodiesService.createBody(carBodyDto);
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
    getByName(@Param('name') name: string) {
        return this.bodiesService.getBodyByName(name);
    }
}
