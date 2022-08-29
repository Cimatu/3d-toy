import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailsService } from 'src/cars/details/details.service';
import { CartItemService } from './cart-item/cart-item.service';
import { Cart } from './carts.entity';


@Injectable()
export class CartsService {

    constructor(
        @InjectRepository(Cart)
        private readonly cartRepository: Repository<Cart>,
        private detailsService: DetailsService,
        private cartItemService: CartItemService
    ) { }

    async createCart() {
        return await this.cartRepository.save({});
    }

    async updateCart(userId: number, details: InterfaceDetail[]) {
        const cart = await this.getCartByUserId(userId)
        if (!cart) {
            throw new HttpException("Cart not found", HttpStatus.NOT_FOUND);
        }

        const detailsObjs = await Promise.all(
            details.map(async (el) => await this.detailsService.getDetailByName(el.name))
        );
        if (!detailsObjs.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }

        const cartItems = await Promise.all(
            cart.cartItems.map(async (el) => await this.cartItemService.getCartItemById(el.id))
        );

        for (let i = 0; i < detailsObjs.length; i++) {
            let flag = false;
            for (let j = 0; j < cartItems.length; j++) {
                if (detailsObjs[i].id === cartItems[j].detail[0].id) {
                    await this.cartItemService.addQuantity(cartItems[j].id);
                    flag = true;
                    break;
                    //количество увеличивается на 1 если id предмета в корзине
                    //и добавляемого предмета совпадает
                }
            }
            //добавляемый предмет добавляется в массив с новым id
            if (!flag) {
                const newCartItem = await this.cartItemService.createCartItem(detailsObjs[i]);
                cart.cartItems = [...cart.cartItems, newCartItem]
            }

        }

        return await this.cartRepository.save(cart)
    }

    async deleteFromCart(userId: number, details: InterfaceDetail[]) {
        const cart = await this.getCartByUserId(userId)
        if (!cart) {
            throw new HttpException("Cart not found", HttpStatus.NOT_FOUND);
        }

        const detailsObjs = await Promise.all(
            details.map(async (el) => await this.detailsService.getDetailByName(el.name))
        );
        if (!detailsObjs.length) {
            throw new HttpException("No changes", HttpStatus.NOT_FOUND);
        }

        const cartItems = await Promise.all(
            cart.cartItems.map(async (el) => await this.cartItemService.getCartItemById(el.id))
        );

        for (let i = 0; i < detailsObjs.length; i++) {
            for (let j = 0; j < cartItems.length; j++) {
                if (detailsObjs[i].id === cartItems[j].detail[0].id) {
                    await this.cartItemService.deteleCartItem(cartItems[j].id);
                    break;
                }
            }
        }

        return await this.cartRepository.save(cart)
    }

    async getCartByUserId(userId: number) {
        return await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.userId = :userId', { userId })
            .getOne();
    }

    async getCartById(id: number) {
        return await this.cartRepository
            .createQueryBuilder('carts')
            .leftJoinAndSelect('carts.cartItems', 'cartItems')
            .where('carts.id = :id', { id })
            .getOne();
    }
}
