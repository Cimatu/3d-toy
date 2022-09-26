import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FAQsService } from './faq.service';
import { FAQ } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';

class DeleteResponse {
    @ApiProperty({ example: 'FAQ was successfuly deleted' })
    message: string;
}


@ApiTags('FAQs')
@Controller('faqs')
export class FAQsController {

    constructor(private faqService: FAQsService) { }

    @ApiOperation({ summary: 'Create FAQ' })
    @ApiResponse({ status: 200, type: FAQ })
    @Post('create')
    create(@Body() dto: CreateFaqDto) {
        return this.faqService.createFAQ(dto);
    }

    @ApiOperation({ summary: 'Update FAQ by id' })
    @ApiResponse({ status: 200, type: FAQ })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() dto: CreateFaqDto) {
        return this.faqService.updateFAQById(id, dto);
    }

    @ApiOperation({ summary: 'Delete FAQ by id' })
    @ApiResponse({ status: 200, type: DeleteResponse })
    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.faqService.deleteFAQById(id);
    }

    @ApiOperation({ summary: `Get FAQs list` })
    @ApiResponse({ status: 200, type: [FAQ] })
    @Get('get_all')
    getAll() {
        return this.faqService.getAllFAQs();
    }

    @ApiOperation({ summary: 'Get one single FAQ by its id'  })
    @ApiResponse({ status: 200, type: FAQ })
    @Get('get_one/:id')
    getOne(@Param('id') id: number) {
        return this.faqService.getOneById(id);
    }
}
