import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Detail } from 'src/cars/details/deltails.entity';
import { CartItem } from './cart-item.entity';
import { Cart } from '../carts.entity';


@Injectable()
export class CartItemService {

    constructor(
        @InjectRepository(CartItem)
        private readonly cartItemRepository: Repository<CartItem>,
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
    ) { }

    async createCartItem(detail: Detail, userId: number) {
        const cart = await this.getCartByUserId(userId);

        const checkItem = await this.getCartItemByDetailAndUserId(detail.id, userId);
        if (checkItem) {
            throw new HttpException("Cart item with such detail already exists", HttpStatus.FORBIDDEN);
        }
        const item = await this.cartItemRepository.create({ quantity: 1, total: detail.price, detail })

        return await this.cartItemRepository.save(item);
    }

    async addQuantity(detailId: number, userId: number) {
        const cart = await this.getCartByUserId(userId);

        const cartItem = await this.getCartItemByDetailAndUserId(detailId, userId);
        if (!cartItem) {
            throw new HttpException("No such cart item", HttpStatus.NOT_FOUND);
        }
        cartItem.quantity += 1;
        cartItem.total += cartItem.detail.price;
        return await this.cartItemRepository.save(cartItem)
    }

    async takeQuantity(detailId: number, userId: number) {
        const cartItem = await this.getCartItemByDetailAndUserId(detailId, userId);
        if (!cartItem) {
            throw new HttpException("No such cart item", HttpStatus.NOT_FOUND);
        }
        if (cartItem.quantity == 1) {
            return await this.deteleCartItem(detailId, userId);
        } else {
            cartItem.quantity -= 1;
            cartItem.total += cartItem.detail.price;
            return await this.cartItemRepository.save(cartItem);
        }
    }

    async deteleCartItem(detailId: number, userId: number) {
        const cartItem = await this.getCartItemByDetailAndUserId(detailId, userId);

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

    async getCartItemByDetailAndUserId(detailId: number, userId: number) {
        const cart = await this.getCartByUserId(userId);

        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.detailId = :detailId', { detailId })
            .andWhere('cartItem.cartId = :cartId', { cartId: cart.id })
            .getOne();
    }

    async getCartItemsByUserId(userId: number) {
        const cart = await this.getCartByUserId(userId);

        return await this.cartItemRepository
            .createQueryBuilder('cartItem')
            .leftJoinAndSelect('cartItem.detail', 'detail')
            .where('cartItem.cartId = :cartId', { cartId: cart.id })
            .getMany();
    }

    private async getCartByUserId(userId: number) {
        return await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.userId = :userId', { userId })
            .getOne();
    }
}
