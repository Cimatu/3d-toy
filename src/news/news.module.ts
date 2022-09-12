import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';


@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [
        TypeOrmModule.forFeature([News]),
    ],

})
export default class NewsModule { }
