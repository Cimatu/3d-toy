import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from 'src/cars/details/deltails.entity';
import { CartItem } from './cart-item.entity';
import { CartsService } from '../carts.service';
import { Cart } from '../carts.entity';


@Injectable()
export class CartItemService {

    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async createCartItem(detail: Detail, cartId: number) {
        const checkItem = await this.getCartItemByDetailId(detail.id, cartId);
        if (checkItem) {
            throw new HttpException("Cart item with such detail already exists", HttpStatus.FORBIDDEN);
        }
        const item = await this.cartItemRepository.create({ quantity: 1, total: detail.price, detail })

        return await this.cartItemRepository.save(item);
    }

    async addQuantity(detailId: number, cartId: number) {
        const cartItem = await this.getCartItemByDetailId(detailId, cartId);
        if (!cartItem) {
            throw new HttpException("No such cart item", HttpStatus.NOT_FOUND);
        }
        cartItem.quantity += 1;
        cartItem.total += cartItem.detail.price;
        return await this.cartItemRepository.save(cartItem)
    }

    async takeQuantity(detailId: number, cartId: number) {
        const cartItem = await this.getCartItemByDetailId(detailId, cartId);
        if (!cartItem) {
            throw new HttpException("No such cart item", HttpStatus.NOT_FOUND);
        }
        if (cartItem.quantity == 1) {
            return await this.deteleCartItem(detailId, cartId);
        } else {
            cartItem.quantity -= 1;
            cartItem.total += cartItem.detail.price;
            return await this.cartItemRepository.save(cartItem);
        }
    }

    async deteleCartItem(detailId: number, cartId: number) {
        const cartItem = await this.getCartItemByDetailId(detailId, cartId);
        if (!cartItem) {
            throw new HttpException("No such cart item", HttpStatus.NOT_FOUND);
        }
        return await this.cartItemRepository.delete(cartItem.id);
    }

    async getCartItemById(id: number) {
        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.id = :id', { id })
            .getOne();
    }

    async getCartItemsByCartId(cartId: number) {
        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.cartId = :cartId', { cartId })
            .getMany();
    }

    async getCartItemByDetailId(detailId: number, cartId: number) {
        const item = await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.detailId = :detailId', { detailId })
            .andWhere('cartItem.cartId = :cartId', { cartId })
            .getOne();
        return item
    }

    async getCartItemsByUserId(userId: number) {
        const cart = await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.userId = :userId', { userId })
            .getOne();

        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.cartId = :cartId', { cartId: cart.id })
            .getMany();
    }
}
