import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import BallBearingSet from './ball-bearing.entity';
import { BallBearingService } from './ball-bearing.service';
import { CreateBBSDto } from './dto/create-bbs.dto';


@ApiTags('Ball Bearing')
@Controller('ballbearing')
export class BallBearingController {
    constructor(private detailsServie: BallBearingService) { }

    @ApiOperation({ summary: 'Ball bearing creation' })
    @ApiResponse({ status: 200, type: BallBearingSet })
    @Post('create')
    create(@Body() dto: CreateBBSDto) {
        return this.detailsServie.createSet(dto);
    }

    @ApiOperation({ summary: 'Get Ball bearing set' })
    @ApiResponse({ status: 200, type: [BallBearingSet] })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAll()
    }

}

