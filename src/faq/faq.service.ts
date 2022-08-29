import { Injectable } from '@nestjs/common';
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

    async getAllFAQs() {
        return await this.faqRepository
            .createQueryBuilder('faqs')
            .getMany();
    }
}
