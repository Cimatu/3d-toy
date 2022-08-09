import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GearsService } from './gears.service';


@ApiTags('Gears')
@Controller('gears')
export class GearsController {
    constructor(private gearsServie: GearsService) { }

    @ApiOperation({ summary: 'Gear creation' })
    @ApiResponse({ status: 200 })
    @Post('create')
    create(@Body() gearsDto: {price: number, name: string}) {
        return this.gearsServie.createGear(gearsDto);
    }

    @ApiOperation({ summary: 'Get all gears' })
    @ApiResponse({ status: 200 })
    @Get('get_all')
    getAllDetails() {
        return this.gearsServie.getAll()
    }

}

