import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartsService } from 'src/carts/carts.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private cartService: CartsService,
    ) { }

    async createUser(dto: CreateUserDto) {
        const findUser = await this.userRepository.findOneBy({ username: dto.username });
        if (findUser) {
            throw new NotFoundException("Such username exist");
        }

        const cart = await this.cartService.createCart();
        if (!cart) {
            throw new Error("Cart wasn't created")
        }

        const user = new User();
        user.username = dto.username;
        user.cart = cart;

        return await this.userRepository.save(user);
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository.findOneBy({ username });
        console.log(user.cart)
        if (!user) {
            throw new NotFoundException("Such username exist");
        }
        return user;
    }
}
