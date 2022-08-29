import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpacersService } from './spacers.service';
import Spacer from './spacers.entity';
import { CreateSpaerDto } from './dto/create-spacer.dto';


@ApiTags('Spacers')
@Controller('spacers')
export class SpacersController {
    constructor(private spacersServie: SpacersService) { }

    @ApiOperation({ summary: 'Spacer creation' })
    @ApiResponse({ status: 200, type: Spacer })
    @Post('create')
    create(@Body() spacerDto: CreateSpaerDto) {
        return this.spacersServie.createSpacer(spacerDto);
    }

    @ApiOperation({ summary: 'Get all spacers' })
    @ApiResponse({ status: 200, type: [Spacer] })
    @Get('get_all')
    getAll() {
        return this.spacersServie.getAll()
    }
}
