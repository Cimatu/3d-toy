import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Spoiler from './spoilers.entity';
import { SpoilersService } from './spoilers.service';

@ApiTags('Spoilers')
@Controller('spoilers')
export class SpoilersController {

    constructor(private spoilersService: SpoilersService) { }

    @ApiOperation({ summary: 'Spoiler creation' })
    @ApiResponse({ status: 200, type: Spoiler })
    @Post('create')
    create(@Body() toningDto: CreateDetailDto) {
        return this.spoilersService.createSpoiler(toningDto);
    }

    @ApiOperation({ summary: `Get list of all spoilers` })
    @ApiResponse({ status: 200, type: [Spoiler] })
    @Get('get_all')
    getAll() {
        return this.spoilersService.getAllSpoilers();
    }

    @ApiOperation({ summary: `Get spoiler by name` })
    @ApiResponse({ status: 200, type: Spoiler })
    @Get('get_by_name/:name')
    getByName(@Param('name') name: string) {
        return this.spoilersService.getSpoilerByName(name);
    }
}
