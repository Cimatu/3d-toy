import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FAQsService } from './faq.service';
import { FAQ } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';


@ApiTags('FAQs')
@Controller('faqs')
export class FAQsController {

    constructor(private faqService: FAQsService) { }

    @ApiOperation({ summary: 'FAQ creation' })
    @ApiResponse({ status: 200, type: FAQ })
    @Post('create')
    create(@Body() orderDto: CreateFaqDto) {
        return this.faqService.createFAQ(orderDto);
    }

    @ApiOperation({ summary: `FAQs list` })
    @ApiResponse({ status: 200, type: [FAQ] })
    @Get('get_all')
    getAll() {
        return this.faqService.getAllFAQs();
    }
}
