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
    signIn(@Body() userDto: SignDto) {
        return this.authService.signIn(userDto)
    }

    @ApiOperation({ summary: 'Sign up for admin' })
    @Post('signup')
    signUp(@Body() userDto: SignDto) {
        return this.authService.signUp(userDto)
    }

    @ApiOperation({ summary: 'Sign out for admin' })
    @Post('signout')
    signOut(@Body() dto: SignOutDto) {
        return this.authService.signOut(dto.token)
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
