import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import Token from "./token.entity";
import { Repository } from "typeorm";

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: Repository<Token>,
        private jwtService: JwtService
    ) { }

    async generateTokens(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role }
        return {
            token: this.jwtService.sign(payload, { secret: `${process.env.JWT_ACCESS_SECRET}`, expiresIn: '1d' }),
            refreshToken: this.jwtService.sign(payload, { secret: `${process.env.JWT_REFRESH_SECRET}`, expiresIn: '30d' })
        }
    }

    async saveToken(userId: number, refreshToken: string) {
        const tokenData = await this.tokenRepository
            .createQueryBuilder('tokens')
            .where('tokens.userId = :userId', { userId })
            .getOne();
        console.log(12)
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await this.tokenRepository.save(tokenData);
        }
        return await this.tokenRepository.save({ userId, refreshToken })
    }


    async refresh(refreshToken: string) {

    }

    async deleteToken(refreshToken: string) {
        const token = await this.getToken(refreshToken);
        if (!token) {
            throw new HttpException("Token not found", HttpStatus.NOT_FOUND);
        }
        return await this.tokenRepository.delete(token.id)
    }


    async deleteTokenByUser(userId: number) {
        const token = await this.getTokenByUserId(userId);
        console.log(token)
        if (!token) {
            throw new HttpException("Token not found", HttpStatus.NOT_FOUND);
        }
        return await this.tokenRepository.delete(token.id)
    }


    async getToken(refreshToken: string) {
        return await this.tokenRepository
            .createQueryBuilder('tokens')
            .where('tokens.refreshToken = :refreshToken', { refreshToken })
            .getOne();
    }

    async getTokenByUserId(userId: number) {
        return await this.tokenRepository
            .createQueryBuilder('tokens')
            .where('tokens.userId = :userId', { userId })
            .getOne();
    }

    async validateAccessToken(token: string) {
        return await this.jwtService.verify(token, { secret: `${process.env.JWT_ACCESS_SECRET}` });
    }

    async validateRefreshToken(token: string) {
        return await this.jwtService.verify(token, { secret: `${process.env.JWT_REFRESH_SECRET}` });
    }
}