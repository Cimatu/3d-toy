import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetailsService } from './details.service';
import Detail from './deltails.entity';


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

    @ApiOperation({ summary: 'Get details catalog' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAllDetails()
    }

    @ApiOperation({ summary: 'Filtered details catalog ' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('filter')
    filterDetails(@Body() body: { types: string[] }) {
        return this.detailsServie.filterDetails(body.types);
    }
}
