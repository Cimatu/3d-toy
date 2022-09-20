import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from 'src/carts/carts.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { SignDto } from './dto/sign.dto';
import { Role } from './role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private cartService: CartsService,
    ) { }

    async createAdmin(dto: SignDto) {
        const admin = await this.userRepository.create(dto);
        admin.role = Role.ADMIN;
        // console.log(admin)
        return await this.userRepository.save(admin);
        // return admin;
    }

    async createUser(dto: CreateUserDto) {
        const { username } = dto;
        const findUser = await this.getUserByUsername(username);
        if (findUser) {
            throw new NotFoundException("Such username already exists");
        }

        const user = await this.userRepository.save({ username });
        if (!user) {
            throw new NotFoundException("Create user error");
        }

        const cart = await this.cartService.createCart();
        if (!cart) {
            throw new NotFoundException("Cart wasn't created");
        }

        user.cart = cart;
        return await this.userRepository.save(user);
    }

    async getAllUsers() {
        const users = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .getMany();
        if (!users) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return users;
    }

    async getUserByUsername(username: string) {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .where('users.username = :username', { username })
            .getOne();
        return user;
    }

    async getUserByEmail(email: string) {
        return await this.userRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne();
    }

    async getUserById(id: number) {
        const user = await this.userRepository
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.cart', 'user')
            .where('users.id = :id', { id })
            .getOne();
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async deteteUserById(id: number) {
        const user = this.getUserById(id);
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return await this.userRepository.delete(id);
    }
}
