import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from '../dto/create-detail.dto';
import { BodiesService } from './bodies.service';
import CarBody from './bodies.entity'


@ApiTags('Bodies')
@Controller('bodies')
export class BodiesController {

    constructor(private bodiesService: BodiesService) { }

    @ApiOperation({ summary: 'Body creation' })
    @ApiResponse({ status: 200, type: CarBody })
    @Post('create')
    create(@Body() toningDto: CreateDetailDto) {
        return this.bodiesService.createBody(toningDto);
    }

    @ApiOperation({ summary: `Get list of all bodies` })
    @ApiResponse({ status: 200, type: [CarBody] })
    @Get('get_all')
    getAll() {
        return this.bodiesService.getAllBodies();
    }

    @ApiOperation({ summary: `Get car body by name` })
    @ApiResponse({ status: 200, type: CarBody })
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.bodiesService.getBodyByName(name);
    }
}
