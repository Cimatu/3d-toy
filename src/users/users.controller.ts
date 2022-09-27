import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, type: User })
    @Post('create')
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({ summary: `Get list of all users` })
    @ApiResponse({ status: 200, type: [User] })
    @Get('get_all')
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({ summary: `Get user by unique username` })
    @ApiResponse({ status: 200, type: User })
    @Get('get_by_username/:username')
    getUserByUsername(@Param('username') username: string) {
        return this.usersService.getUserByUsername(username);
    }

    @ApiOperation({ summary: `Get user by unique username` })
    @ApiResponse({ status: 200 })
    @Get('delete_by_id/:user_id')
    deleteUserById(@Param('user_id') user_id: number) {
        return this.usersService.deteteUserById(user_id);
    }
}
