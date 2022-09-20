import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.entity";
import { SignDto } from "src/users/dto/sign.dto";


@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
        private jwtService: JwtService) { }

    async signUp(userDto: SignDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createAdmin({ ...userDto, password: hashPassword })
        console.log(user)
        return this.generateToken(user)
    }

    async signIn(userDto: SignDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: SignDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
    }
}