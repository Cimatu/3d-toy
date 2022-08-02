import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './carts.entity';


@Injectable()
export class CartsService {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async createCart() {
        return await this.cartRepository.save({});
    }

    async getAllWheels() {
        return await this.cartRepository.find();
    }

    async getWheelByName(name: string) {
        if (name) {
            return await this.cartRepository.findOneBy({});
        } else {
            return undefined;
        }
    }
}
