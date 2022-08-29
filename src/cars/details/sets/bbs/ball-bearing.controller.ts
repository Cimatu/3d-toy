import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BallBearingService } from './ball-bearing.service';
import BallBearingSet from './ball-bearing.entity';
import { CreateBBSDto } from './dto/create-bbs.dto';


@ApiTags('Ball Bearing')
@Controller('ballbearing')
export class BallBearingController {
    constructor(private detailsServie: BallBearingService) { }

    @ApiOperation({ summary: 'Ball bearing creation' })
    @ApiResponse({ status: 200, type: BallBearingSet })
    @Post('create')
    create(@Body() dto: CreateBBSDto) {
        return this.detailsServie.createBBS(dto);
    }

    @ApiOperation({ summary: 'Get Ball bearing set' })
    @ApiResponse({ status: 200, type: [BallBearingSet] })
    @Get('get_all')
    getAll() {
        return this.detailsServie.getAllBBS()
    }

}
