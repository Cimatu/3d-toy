import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetailsService } from './details.service';
import { Detail } from './deltails.entity';
import { CreateDetailDto } from './dto/create-detail.dto';


@ApiTags('Details')
@Controller('details')
export class DetailsController {
    constructor(private detailsServie: DetailsService) { }

    @ApiOperation({ summary: 'Create detail' })
    @ApiResponse({ status: 200, type: Detail })
    @Post('create')
    create(@Body() detailDto: CreateDetailDto) {
        return this.detailsServie.createDetail(detailDto);
    }

    @ApiOperation({ summary: 'Get details types list' })
    @ApiResponse({ status: 200 })
    @Get('get_details_types_list')
    getDetailsTypesList() {
        return this.detailsServie.getDetailsTypesList();
    }

    @ApiOperation({ summary: 'Get details catalog' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAllDetails()
    }

    @ApiOperation({ summary: 'Filtered details catalog by types' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('filter_by_types')
    filterDetailsByTypes(@Body() body: { details: [Detail], types: string[] }) {
        console.log(body.details)
        return this.detailsServie.filterDetails(body.details, body.types);
    }

    @ApiOperation({ summary: 'Filtered details catalog by price' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('filter_by_price')
    filterDetailsByPrice(@Body() body: { details: [Detail], min: number, max: number }) {
        return this.detailsServie.filterByPrice(body.details, body.min, body.min);
    }
}
