import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from 'src/cars/details/deltails.entity';
import { CartItem } from './cart-item.entity';


@Injectable()
export class CartItemService {

    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
    ) { }

    async createCartItem(detail: Detail) {
        const checkItem = this.getCartItemByDetailId(detail.id);
        if(checkItem){
            throw new HttpException("Cart item with such detail already exists", HttpStatus.FORBIDDEN);
        }
        const item = await this.cartItemRepository.create({ quantity: 1, total: detail.price, detail })

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

    async getCartItemsByCartID(cartId: number) {
        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.cartId = :cartId', { cartId })
            .getMany();
    }

    async getCartItemByDetailId(detailId: number){
        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.detailId = :detailId', { detailId })
            .getOne();
    }
}
