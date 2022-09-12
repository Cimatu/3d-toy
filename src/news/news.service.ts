import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './news.entity';


@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) { }

    async createNews(dto: CreateNewsDto) {
        const event = await this.newsRepository.create(dto)
        if (!event) {
            throw new HttpException("News wasn't created", HttpStatus.NOT_FOUND);
        }
        return await this.newsRepository.save(event);
    }

    async updateNewsById(id: number, dto: CreateNewsDto) {
        const { name, date, text } = dto;

        const news = await this.getNewsById(id);
        if (!news) {
            throw new HttpException("News not found", HttpStatus.NOT_FOUND);
        }
        if (name) {
            news.name = name;
        }
        if (text) {
            news.text = text;
        }
        if (date) {
            news.date = date;
        }
        return await this.newsRepository.save(news);
    }

    async deleteNewsById(id: number) {
        let news = await this.getNewsById(id);
        if (!news) {
            throw new HttpException("News not found", HttpStatus.NOT_FOUND);
        }
        await this.newsRepository.delete(id);
        news = await this.getNewsById(id);
        if (!news) {
            return { message: "News was successfuly deleted" }
        } else {
            return { message: "News wasn't deleted" }
        }
    }

    async getAllNews() {
        return await this.newsRepository
            .createQueryBuilder('news')
            .getMany();
    }

    async getNewsById(id: number) {
        return await this.newsRepository
            .createQueryBuilder('news')
            .where('news.id = :id', { id })
            .getOne();
    }
}
