import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailsService } from 'src/cars/details/details.service';
import { CartItemService } from './cart-item/cart-item.service';
import { Cart } from './carts.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';


@Injectable()
export class CartsService {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private detailsService: DetailsService,
        private cartItemService: CartItemService,
    ) { }

    async createCart(user: User) {
        return await this.cartRepository.save({ user });
    }

    async addCarToCart(userId: number, detailsIds: number[]) {
        const cart = await this.getCartByUserId(userId)
        if (!cart) {
            throw new HttpException("Cart not found", HttpStatus.NOT_FOUND);
        }

        const details = await Promise.all(
            detailsIds.map(async (el) => await this.detailsService.getDetailById(el))
        );

        if (!details.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }
        const cartItems = await Promise.all(
            cart.cartItems.map(async (el) => await this.cartItemService.getCartItemById(el.id))
        );
        for (let i = 0; i < details.length; i++) {
            let flag = false;
            for (let j = 0; j < cartItems.length; j++) {
                if (details[i].id === cartItems[j].detail.id) {
                    await this.cartItemService.addQuantity(cartItems[j].detail.id, userId);
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                const newCartItem = await this.cartItemService.createCartItem(details[i], userId);
                cart.cartItems = [...cart.cartItems, newCartItem];
            }
        }
        cart.total = await this.setTotal(cart);
        cart.quantity = await this.setQuatity(cart);
        await this.cartRepository.save(cart);

        return await this.getCartById(cart.id);
    }

    async addToCart(userId: number, detailId: number) {
        const cart = await this.getCartByUserId(userId);
        if (!cart) {
            throw new HttpException("Cart not found", HttpStatus.NOT_FOUND);
        }
        const detail = await this.detailsService.getDetailById(detailId);
        if (!detail) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }
        const newCartItem = await this.cartItemService.createCartItem(detail, userId);
        cart.cartItems = [...cart.cartItems, newCartItem];
        cart.total = await this.setTotal(cart);
        cart.quantity = await this.setQuatity(cart);

        return await this.cartRepository.save(cart);
    }

    private async setTotal(cart: Cart) {
        let total = 0;
        for (let i = 0; i < cart.cartItems.length; i++) {
            total += cart.cartItems[i].total;
        }
        return total;
    }

    private async setQuatity(cart: Cart) {
        let quantity = 0;
        for (let i = 0; i < cart.cartItems.length; i++) {
            quantity += cart.cartItems[i].quantity;
        }
        return quantity;
    }


    async deleteFromCart(userId: number, detailsIds: number[]) {
        const cart = await this.getCartByUserId(userId);
        console.log(cart)
        if (!cart) {
            throw new HttpException("Cart not found", HttpStatus.NOT_FOUND);
        }

        const details = await Promise.all(
            detailsIds.map(async (el) => await this.detailsService.getDetailById(el))
        );
        if (!details.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }

        const cartItems = await Promise.all(
            cart.cartItems.map(async (el) => await this.cartItemService.getCartItemById(el.id))
        );
        for (let i = 0; i < details.length; i++) {
            for (let j = 0; j < cartItems.length; j++) {
                if (details[i].id === cartItems[j].detail.id) {
                    await this.cartItemService.deteleCartItem(cartItems[j].detail.id, userId);
                    break;
                }
            }
        }

        return await this.getCartByUserId(userId)
    }

    async getCartByUserId(userId: number) {
        const cart = await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.userId = :userId', { userId })
            .getOne();
        console.log(cart)
        return cart;
    }

    async getCartById(id: number) {
        return await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.id = :id', { id })
            .getOne();
    }

    async getAll() {
        return await this.cartRepository
            .createQueryBuilder('carts')
            .getMany();
    }
}
