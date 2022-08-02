import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Wheel from './wheels.entity';
import { WheelsService } from './wheels.service';

@ApiTags('Wheels')
@Controller('wheels')
export class WheelsController {

    constructor(private wheelsService: WheelsService) { }

    @ApiOperation({ summary: 'Wheel creation' })
    @ApiResponse({ status: 200, type: Wheel })
    @Post('create')
    create(@Body() wheelsDto: CreateDetailDto) {
        return this.wheelsService.createWheel(wheelsDto);
    }

    @ApiOperation({ summary: 'Update wheel' })
    @ApiResponse({ status: 200, type: Wheel })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() wheelsDto: CreateDetailDto) {
        console.log(id)
        return this.wheelsService.updateWheel(wheelsDto, id);
    }

    @ApiOperation({ summary: `Get list of all wheels` })
    @ApiResponse({ status: 200, type: [Wheel] })
    @Get('get_all')
    getAll() {
        return this.wheelsService.getAllWheels();
    }

    @ApiOperation({ summary: `Get wheel by name` })
    @ApiResponse({ status: 200, type: Wheel })
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.wheelsService.getWheelByName(name);
    }
}
