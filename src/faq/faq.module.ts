import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQsController } from './faq.controller';
import { FAQsService } from './faq.service';
import { FAQ } from './faq.entity';


@Module({
    controllers: [FAQsController],
    providers: [FAQsService],
    imports: [
        TypeOrmModule.forFeature([FAQ])
    ],
})
export default class FAQsModule { }
