import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './news.entity';
import { NewsService } from './news.service';

class DeleteResponse {
    @ApiProperty({ example: 'News was successfuly deleted' })
    message: string;
}

@ApiTags('News')
@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService) { }

    @ApiOperation({ summary: 'Create news' })
    @ApiResponse({ status: 200, type: News })
    @Post('create')
    create(@Body() newsDto: CreateNewsDto) {
        return this.newsService.createNews(newsDto);
    }

    @ApiOperation({ summary: 'Update news by id' })
    @ApiResponse({ status: 200, type: News })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() newsDto: CreateNewsDto) {
        return this.newsService.updateNewsById(id, newsDto);
    }

    @ApiOperation({ summary: 'Delete news by id' })
    @ApiResponse({ status: 200, type: DeleteResponse })
    @Delete('delete/:id')
    detele(@Param('id') id: number) {
        return this.newsService.deleteNewsById(id);
    }

    @ApiOperation({ summary: 'Get news list' })
    @ApiResponse({ status: 200, type: [News] })
    @Get('get_all')
    getAll() {
        return this.newsService.getAllNews();
    }

    @ApiOperation({ summary: 'Get one single news by its id' })
    @ApiResponse({ status: 200, type: News })
    @Get('get_one/:id')
    getOneById(@Param('id') id: number) {
        return this.newsService.getNewsById(id);
    }
}
