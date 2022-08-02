import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
        const findUser = await this.userRepository
            .createQueryBuilder('users')
            .where('users.username = :username', { username: dto.username })
            .getOne();

        if (findUser) {
            throw new NotFoundException("Such username exist");
        }

        const cart = await this.cartService.createCart();
        if (!cart) {
            throw new NotFoundException("Cart wasn't created");
        }

        const user = new User();
        user.username = dto.username;
        user.cart = cart;

        return await this.userRepository.save(user);
    }

    async getAllUsers() {
        const users = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .getMany();
        if (!users) {
            throw new NotFoundException("User not found");
        }
        return users;
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .where('users.username = :username', { username })
            .getOne();
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async getUserById(id: number) {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .where('users.id = :id', { id })
            .getOne();
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async deteteUserById(id: number) {
        const user = this.getUserById(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return await this.userRepository.delete(id);
    }
}
