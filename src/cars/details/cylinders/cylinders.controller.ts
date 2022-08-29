import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CylindersService } from './cylinders.service';
import Cylinder from './cylinders.entity';
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
        return this.cylindersService.getAllCylinders();
    }
}
