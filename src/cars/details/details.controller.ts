import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetailsService } from './details.service';
import { Detail } from './deltails.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { GetDetailByNameDto, GetDetailsByPriceDto } from './dto/get-detail-by.dto';


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

    @ApiOperation({ summary: 'Update detail by id' })
    @ApiResponse({ status: 200, type: Detail })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() dto: UpdateDetailDto) {
        return this.detailsServie.updateDetail(id, dto);
    }

    @ApiOperation({ summary: 'Get details catalog' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('get_all')
    getAllDetails() {
        return this.detailsServie.getAllDetails()
    }

    @ApiOperation({ summary: 'Get detail by id' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('get_by/:id')
    getDetailById(@Param('id') id: number) {
        return this.detailsServie.getDetailById(id);
    }

    @ApiOperation({ summary: 'Get detail by name' })
    @ApiResponse({ status: 200, type: Detail })
    @Get('get_by_name')
    getDetailByName(@Body() dto: GetDetailByNameDto) {
        return this.detailsServie.getDetailByName(dto.name);
    }

    @ApiOperation({ summary: 'Filtered details catalog by price' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get('filter_by_price')
    filterDetailsByPrice(@Body() dto: GetDetailsByPriceDto) {
        return this.detailsServie.filterByPrice(dto);
    }

    @ApiOperation({ summary: 'Delete detail by id' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Delete('delete/:id')
    deleteByID(@Param('id') id: number) {
        return this.detailsServie.deleteDetailById(id);
    }
}
