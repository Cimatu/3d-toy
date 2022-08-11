import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateGearDto } from './dto/create-gears.dto';
import Gear from './gears.entity';
import { GearsService } from './gears.service';


@ApiTags('Gears')
@Controller('gears')
export class GearsController {
    constructor(private gearsServie: GearsService) { }

    @ApiOperation({ summary: 'Gear creation' })
    @ApiResponse({ status: 200, type: Gear })
    @Post('create')
    create(@Body() gearsDto: CreateGearDto) {
        return this.gearsServie.createGear(gearsDto);
    }

    @ApiOperation({ summary: 'Get all gears' })
    @ApiResponse({ status: 200, type: [Gear] })
    @Get('get_all')
    getAllDetails() {
        return this.gearsServie.getAll()
    }

}

