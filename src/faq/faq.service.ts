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

    async createFAQ(faqDto: CreateFaqDto) {
        return await this.faqRepository.save(faqDto)
    }

    async updateFAQById(id: number, faqDto: CreateFaqDto) {
        const faq = await this.getOneById(id)
        if (!faq) {
            throw new HttpException("FAQ not found", HttpStatus.NOT_FOUND);
        }
        if (faqDto.name) {
            faq.name = faqDto.name;
        }

        if (faqDto.text) {
            faq.text = faqDto.text;
        }

        return await this.faqRepository.save(faq)
    }

    async deleteFAQById(id: number) {
        let faq = await this.getOneById(id);
        if (!faq) {
            throw new HttpException("FAQ not found", HttpStatus.NOT_FOUND);
        }
        await this.faqRepository.delete(id);
        faq = await this.getOneById(id);
        if(!faq){
            return {message: "FAQ was deleted", status: HttpStatus.OK}
        }else{
            return {message: "FAQ wasn't deleted", status: HttpStatus.BAD_REQUEST}
        }
    }

    async getAllFAQs() {
        return await this.faqRepository
            .createQueryBuilder('faqs')
            .getMany();
    }

    async getOneById(id: number) {
        return await this.faqRepository
            .createQueryBuilder('faqs')
            .where('faqs.id = :id', { id })
            .getOne();
    }
}
