import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import Detail from './deltails.entity';
import { DetailsService } from './details.service';

@ApiTags('Details')
@Controller('details')
export class DetailsController {
    constructor(private detailsServie: DetailsService) { }

    @ApiOperation({ summary: 'Detail creation' })
    @ApiResponse({ status: 200, type: Detail })
    @Post('create')
    create() {
        return this.detailsServie.createDetail();
    }

    @ApiOperation({ summary: 'Get details catalog ' })
    @ApiResponse({ status: 200 })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAllDetails()
    }

    @ApiOperation({ summary: 'Filtered details catalog ' })
    @ApiResponse({ status: 200 })
    @Get('filter')
    filterDetails(@Body() body: { types: string[] }) {
        return this.detailsServie.filterDetails(body.types);
    }
}

