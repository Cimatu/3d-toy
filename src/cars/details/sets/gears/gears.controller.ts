import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GearsService } from './gears.service';
import Gear from './gears.entity';
import { CreateGearDto } from './dto/create-gears.dto';


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
    getAllD() {
        return this.gearsServie.getAllGears()
    }
}
