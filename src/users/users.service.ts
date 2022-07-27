import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.save(dto);
        return user
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOneBy({id: id});
        if(!user) {
            console.log('No such user');
        }
        return user;
    }
}
