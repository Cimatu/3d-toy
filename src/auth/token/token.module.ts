import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from '@nestjs/typeorm';
import Token from './token.entity';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import UsersModule from 'src/users/users.module';
import { User } from 'src/users/users.entity';

@Module({
  controllers: [TokenController],
  providers: [TokenService],
  imports: [
    TypeOrmModule.forFeature([Token, User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    JwtModule,
    TokenService
  ]
})
export class TokenModule { }