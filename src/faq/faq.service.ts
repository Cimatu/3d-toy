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
        const faq = await this.getOneById(id)
        if (!faq) {
            throw new HttpException("FAQ not found", HttpStatus.NOT_FOUND);
        }
        if (dto.name) {
            faq.name = dto.name;
        }

        if (dto.text) {
            faq.text = dto.text;
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
            return {message: "FAQ was successfuly deleted"}
        }else{
            return {message: "FAQ wasn't deleted"}
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
