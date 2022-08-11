import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Cylinder from './cylinders.entity';
import { CylindersService } from './cylinders.service';
import { CreateCylinderDto } from './dto/create-cylinders.dto';


@ApiTags('Cylinders')
@Controller('cylinders')
export class CylindersController {

    constructor(private cylindersService: CylindersService) { }

    @ApiOperation({ summary: 'Body creation' })
    @ApiResponse({ status: 200, type: Cylinder })
    @Post('create')
    create(@Body() cylinderDto: CreateCylinderDto) {
        return this.cylindersService.createCylinder(cylinderDto);
    }

    @ApiOperation({ summary: `Get list of all bodies` })
    @ApiResponse({ status: 200, type: [Cylinder] })
    @Get('get_all')
    getAll() {
        return this.cylindersService.getAll();
    }

    // @ApiOperation({ summary: `Get car body by name` })
    // @ApiResponse({ status: 200, type: Cylinder })
    // @Get('/:name')
    // getByValue(@Param('name') name: string) {
    //     return this.bodiesService.getBodyByName(name);
    // }
}
