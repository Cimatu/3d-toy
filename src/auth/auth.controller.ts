import {Body, Controller, Post} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import { SignDto } from 'src/users/dto/sign.dto';
import {AuthService} from "./auth.service";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/signin')
    login(@Body() userDto: SignDto) {
        return this.authService.signIn(userDto)
    }

    @Post('/signup')
    registration(@Body() userDto: SignDto) {
        return this.authService.signUp(userDto)
    }
}