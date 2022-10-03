import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FAQ } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';


@Injectable()
export class FAQsService {
    constructor(
        @InjectRepository(FAQ)
        private readonly faqRepository: Repository<FAQ>,

    ) { }

    async createFAQ(dto: CreateFaqDto) {
        return await this.faqRepository.save(dto)
    }

    async updateFAQById(id: number, dto: CreateFaqDto) {
        const { name, text } = dto;

        const faq = await this.getFAQById(id)
        if (!faq) {
            throw new HttpException("FAQ not found", HttpStatus.NOT_FOUND);
        }

        if (!name && !text) {
            throw new HttpException("No dto", HttpStatus.NOT_FOUND);
        }

        await this.faqRepository
            .createQueryBuilder()
            .update(FAQ)
            .set({ ...dto })
            .where("id = :id", { id })
            .execute();
        return await this.getFAQById(id);
    }

    async deleteFAQById(id: number) {
        let faq = await this.getFAQById(id);
        if (!faq) {
            throw new HttpException("FAQ not found", HttpStatus.NOT_FOUND);
        }

        await this.faqRepository.delete(id);
        faq = await this.getFAQById(id);
        if (!faq) {
            return { message: "FAQ was successfuly deleted" }
        } else {
            return { message: "FAQ wasn't deleted" }
        }
    }

    async getAllFAQs() {
        return await this.faqRepository
            .createQueryBuilder('faqs')
            .getMany();
    }

    async getFAQById(id: number) {
        return await this.faqRepository
            .createQueryBuilder('faqs')
            .where('faqs.id = :id', { id })
            .getOne();
    }
}
