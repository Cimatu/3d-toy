import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTypeDto } from './dto/create-type.dto';
import { GetDetailsTypesIdsDto, GetDetailTypeNameDto } from './dto/get-details-by-types.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './types.entity';
import { TypesService } from './types.service';


@ApiTags('Types')
@Controller('types')
export class TypesController {
    constructor(private typesServie: TypesService) { }

    @ApiOperation({ summary: 'Create type' })
    @ApiResponse({ status: 200, type: Type })
    @Post('create')
    create(@Body() dto: CreateTypeDto) {
        return this.typesServie.createType(dto);
    }

    @ApiOperation({ summary: 'Update type by id' })
    @ApiResponse({ status: 200, type: Type })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() dto: UpdateTypeDto) {
        return this.typesServie.updateType(id, dto);
    }

    @ApiOperation({ summary: 'Get types list' })
    @ApiResponse({ status: 200, type: [Type] })
    @Get('get_all')
    getAll() {
        return this.typesServie.getAllTypes();
    }

    @ApiOperation({ summary: 'Get type by name' })
    @ApiResponse({ status: 200, type: Type })
    @Get('get_by_name')
    getTypeByName(@Body() dto: GetDetailTypeNameDto) {
        return this.typesServie.getTypeByName(dto.name)
    }

    @ApiOperation({ summary: "Get type's details by name" })
    @ApiResponse({ status: 200, type: [Type] })
    @Get('get_details_by_types_ids')
    getDetailsByTypesId(@Body() dto: GetDetailsTypesIdsDto) {
        return this.typesServie.getDetailsByTypesIds(dto.ids);
    }

    @ApiOperation({ summary: 'Get type by id' })
    @ApiResponse({ status: 200, type: [Type] })
    @Get('get_by/:id')
    getTypeById(@Param('id') id: number) {
        return this.typesServie.getTypeById(id)
    }

    @ApiOperation({ summary: 'Delete type by id' })
    @ApiResponse({ status: 200, type: [Type] })
    @Delete('delete/:id')
    deleteTypeById(@Param('id') id: number) {
        return this.typesServie.detleteType(id)
    }
}
