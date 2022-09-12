import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FAQsService } from './faq.service';
import { FAQ } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';

class DeleteResponse {
    @ApiProperty({ example: 'FAQ was successfuly deleted' })
    message: string;

    @ApiProperty({ example: 200 })
    status: HttpStatus;
}


@ApiTags('FAQs')
@Controller('faqs')
export class FAQsController {

    constructor(private faqService: FAQsService) { }

    @ApiOperation({ summary: 'Create FAQ' })
    @ApiResponse({ status: 200, type: FAQ })
    @Post('create')
    create(@Body() faqDto: CreateFaqDto) {
        return this.faqService.createFAQ(faqDto);
    }

    @ApiOperation({ summary: 'Update FAQ by ID' })
    @ApiResponse({ status: 200, type: FAQ })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() faqDto: CreateFaqDto) {
        return this.faqService.updateFAQById(id, faqDto);
    }


    @ApiOperation({ summary: 'Delete FAQ by id' })
    @ApiResponse({ status: 200, type: DeleteResponse })
    @Delete('delete/:id')
    delete(@Param('id') id: number) {
        return this.faqService.deleteFAQById(id);
    }

    @ApiOperation({ summary: `FAQs list` })
    @ApiResponse({ status: 200, type: [FAQ] })
    @Get('get_all')
    getAll() {
        return this.faqService.getAllFAQs();
    }

    @ApiOperation({ summary: `One single FAQ getted by id` })
    @ApiResponse({ status: 200, type: FAQ })
    @Get('get_one/:id')
    getOne(@Param('id') id: number) {
        return this.faqService.getOneById(id);
    }
}
