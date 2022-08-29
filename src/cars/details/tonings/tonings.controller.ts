import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateDetailDto } from '../dto/create-detail.dto';
import Toning from './tonings.entity';
import { ToningsService } from './tonings.service';


@ApiTags('Tonings')
@Controller('tonings')
export class ToningsController {

    constructor(private toningsService: ToningsService) { }

    @ApiOperation({ summary: 'Toning creation' })
    @ApiResponse({ status: 200, type: Toning })
    @Post('create')
    create(@Body() toningDto: CreateDetailDto) {
        return this.toningsService.createToning(toningDto);
    }

    @ApiOperation({ summary: `Get list of all tonings` })
    @ApiResponse({ status: 200, type: [Toning] })
    @Get('get_all')
    getAll() {
        return this.toningsService.getAllTonings();
    }

    
    @ApiOperation({ summary: `Get toning by name` })
    @ApiResponse({ status: 200, type: Toning })
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.toningsService.getToningByName(name);
    }

}
