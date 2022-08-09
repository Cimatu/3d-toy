import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BallBearingService } from './ball-bearing.service';


@ApiTags('Ball Bearing')
@Controller('ballbearing')
export class BallBearingController {
    constructor(private detailsServie: BallBearingService) { }

    @ApiOperation({ summary: 'Ball bearing creation' })
    @ApiResponse({ status: 200 })
    @Post('create')
    create() {
        return this.detailsServie.createSet();
    }

    @ApiOperation({ summary: 'Get Ball bearing' })
    @ApiResponse({ status: 200 })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAll()
    }

}

