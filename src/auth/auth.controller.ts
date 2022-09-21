import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import { SignDto } from 'src/users/dto/sign.dto';
import {AuthService} from "./auth.service";
import { RecoveryDto, SetNewPasswordDto } from './dto/recovery.dto';


@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Sign in for admin' })
    @Post('signin')
    login(@Body() userDto: SignDto) {
        return this.authService.signIn(userDto)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('signup')
    registration(@Body() userDto: SignDto) {
        return this.authService.signUp(userDto)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('restore_password')
    restorePassword(@Body() recoveryDto: RecoveryDto) {
        return this.authService.restorePassword(recoveryDto.email, recoveryDto.link)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('set_new_password')
    setNewPassword(@Body() recoveryDto: SetNewPasswordDto) {
        return this.authService.setNewPassword(recoveryDto)
    }
}