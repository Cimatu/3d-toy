import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignDto, SignOutDto } from 'src/users/dto/sign.dto';
import { AuthService } from "./auth.service";
import { RecoveryDto, SetNewPasswordDto } from './dto/recovery.dto';


@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @ApiOperation({ summary: 'Sign in for admin' })
    @Post('signin')
    signIn(@Body() dto: SignDto) {
        return this.authService.signIn(dto)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('signup')
    signUp(@Body() dto: SignDto) {
        return this.authService.signUp(dto)
    }

    @ApiOperation({ summary: 'Sign out for admin' })
    @Post('signout')
    signOut(@Body() dto: SignOutDto) {
        return this.authService.signOut(dto.refreshToken)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('restore_password')
    restorePassword(@Body() dto: RecoveryDto) {
        return this.authService.restorePassword(dto.email, dto.link)
    }

    @ApiOperation({ summary: 'Password recovery' })
    @Post('set_new_password')
    setNewPassword(@Body() dto: SetNewPasswordDto) {
        return this.authService.setNewPassword(dto)
    }
}
