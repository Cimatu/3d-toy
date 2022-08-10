import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detail } from 'src/cars/details';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity';


@Injectable()
export class CartItemService {

    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,

    ) { }

    async createCartItem(detail: Detail) {
        const item = await this.cartItemRepository.create({ quantity: 1, detail: [detail] })
        return await this.cartItemRepository.save(item);
    }

    async addQuantity(id: number) {
        const cartItem = await this.getCartItemById(id);
        cartItem.quantity += 1;
        return await this.cartItemRepository.save(cartItem)
    }

    async takeQuantity(id: number) {
        const cartItem = await this.getCartItemById(id);
        if (cartItem.quantity == 1) {
            return await this.deteleCartItem(id);
        } else {
            cartItem.quantity -= 1;
            return await this.cartItemRepository.save(cartItem);
        }
    }

    async deteleCartItem(id: number) {
        return await this.cartItemRepository.delete(id);
    }

    async getCartItemById(id: number) {
        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.id = :id', { id })
            .getOne();
    }
}
