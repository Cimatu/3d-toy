import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import { UsersService } from "src/users/users.service";
import { User } from "src/users/users.entity";
import { SignDto } from "src/users/dto/sign.dto";
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: 'pavel.gurinovich.vit@gmail.com',
        pass: 'pbiktgrovxvqnums'
    }
} as SMTPTransport.Options)

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
        throw new UnauthorizedException({ message: 'Incorrect email or passwrod' })
    }

    async restorePassword(email: string, recoveryLink: string) {
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User with such email not found', HttpStatus.BAD_REQUEST);
        }
        return await this.sendRecoveryEmail(email, recoveryLink)
    }

    async sendRecoveryEmail(to: string, link: string) {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Password recovery',
            text: '',
            html:
                `
            <div>
                <h1>Follow this link to recover your password</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }

    async setNewPassword(dto) {
        const { email, password1, password2 } = dto;
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User with such email not found', HttpStatus.BAD_REQUEST);
        }
        if (password1 !== password2) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(password1, 5);
        return await this.userService.updatePassword(email, hashPassword)
    }

    // async logout(refreshStr: string): Promise<void> {
    //     const refreshToken = await this
    // }

    private async removeToken() {

    }
}