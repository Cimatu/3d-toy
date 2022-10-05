import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'
import { UsersService } from "src/users/users.service";
import { SignDto } from "src/users/dto/sign.dto";
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { TokenService } from "./token/token.service";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER || 'pavel.gurinovich.vit@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'pbiktgrovxvqnums'
    }
} as SMTPTransport.Options)

@Injectable()
export class AuthService {
    constructor(
        private tokenService: TokenService,
        private userService: UsersService,
    ) { }

    async signUp(userDto: SignDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException('User with such email already exists', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createAdmin({ ...userDto, password: hashPassword });
        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            userId: user.id
        };
    }

    async signIn(userDto: SignDto) {
        const user = await this.validateUser(userDto);
        const tokens = await this.tokenService.generateTokens(user);
        await this.tokenService.saveToken(user.id, tokens.refreshToken);
        return {
            ...tokens,
            userId: user.id
        };
    }

    async signOut(refreshToken: string) {
        return await this.tokenService.deleteTokenByUser(refreshToken)
    }

    private async validateUser(userDto: SignDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({ message: 'Incorrect email or passwrod' })
    }

    async restorePassword(email: string, link: string) {
        link = link || 'https://cars-3d.herokuapp.com/restore-password';
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new HttpException('User with such email not found', HttpStatus.BAD_REQUEST);
        }
        const payload = {
            email,
            password: user.password
        };
        const secret = process.env.JWT_ACCESS_SECRET + user.password;
        const token = await this.tokenService.generateLink(payload, secret)
        const recoverLink = `${link}/${user.id}/${token}`;
        return await this.sendRecoveryEmail(email, recoverLink)
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

    async setNewPassword(id: number, token: string, dto) {
        const { password1, password2 } = dto;
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new HttpException('User with such email not found', HttpStatus.BAD_REQUEST);
        }
        const secret = process.env.JWT_ACCESS_SECRET + user.password;
        const checkPayload = this.tokenService.validateLink(token, secret)
        if(!checkPayload){
            throw new HttpException('Wrong user data', HttpStatus.BAD_REQUEST);
        }
        if (password1 !== password2) {
            throw new HttpException('Passwords do not match', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(password1, 5);
        return await this.userService.updatePassword(user.email, hashPassword)
    }
}
