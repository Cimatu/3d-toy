import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRollerDto } from './dto/create-roller.dto';
import Roller from './rollers.entity';
import { RollersService } from './rollers.service';


@ApiTags('Rollers')
@Controller('rollers')
export class RollersController {
    constructor(private rollersServie: RollersService) { }

    @ApiOperation({ summary: 'Roller creation' })
    @ApiResponse({ status: 200, type: Roller })
    @Post('create')
    create(@Body() spacerDto: CreateRollerDto) {
        return this.rollersServie.createRoller(spacerDto);
    }

    @ApiOperation({ summary: 'Get all rollers' })
    @ApiResponse({ status: 200, type: [Roller] })
    @Get('get_all')
    getAll() {
        return this.rollersServie.getAllRollers()
    }
}
