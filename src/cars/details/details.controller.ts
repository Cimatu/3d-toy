import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DetailsService } from './details.service';
import { Detail } from './deltails.entity';
import { CreateDetailDto } from './dto/create-detail.dto';
import { UpdateDetailDto } from './dto/update-detail.dto';
import { GetDetailsByPriceDto, GetDetailsByTypesIdsDto } from './dto/get-detail-by.dto';


@ApiTags('Details')
@Controller('details')
export class DetailsController {
    constructor(private detailsServie: DetailsService) { }

    @ApiOperation({ summary: 'Create detail' })
    @ApiResponse({ status: 200, type: Detail })
    @Post('create')
    create(@Body() dto: CreateDetailDto) {
        return this.detailsServie.createDetail(dto);
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
        return this.detailsServie.getAllDetails();
    }

    @ApiOperation({ summary: 'Get details catalog with pagination' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Get()
    getPaginateDetails(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 0
    ) {
        take = take > 20 ? 20 : take;
        return this.detailsServie.getDetailsWithPagination(take, skip);
    }

    @ApiOperation({ summary: 'Get detail by id' })
    @ApiResponse({ status: 200, type: Detail })
    @Get('get_by_id/:id')
    getDetailById(@Param('id') id: number) {
        return this.detailsServie.getDetailById(id);
    }

    @ApiOperation({ summary: 'Get detail by name' })
    @ApiResponse({ status: 200, type: Detail })
    @Get('get_by_name/:name')
    getDetailByName(@Param('name') name: string) {
        return this.detailsServie.getDetailByName(name);
    }

    @ApiOperation({ summary: 'Filtered details catalog by price' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Post('filter_by_price')
    filterDetailsByPrice(@Body() dto: GetDetailsByPriceDto) {
        return this.detailsServie.filterByPrice(dto);
    }

    @ApiOperation({ summary: 'Get details catalog by types' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Post('get_details_by_types')
    getDetailsByTypes(@Body() dto: GetDetailsByTypesIdsDto) {
        return this.detailsServie.getDetailsByType(dto.ids);
    }

    @ApiOperation({ summary: 'Get details catalog by types with pagintaion' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Post(' filter_with_pagination')
    getDetailsByTypesWithPagination(
        @Query('take') take: number = 10,
        @Query('skip') skip: number = 0,
        @Body() dto: GetDetailsByTypesIdsDto
    ) {
        return this.detailsServie.getDetailsByTypeWithPagination(take, skip, dto.ids);
    }

    @ApiOperation({ summary: 'Delete detail by id' })
    @ApiResponse({ status: 200, type: [Detail] })
    @Delete('delete/:id')
    deleteByID(@Param('id') id: number) {
        return this.detailsServie.deleteDetailById(id);
    }
}
