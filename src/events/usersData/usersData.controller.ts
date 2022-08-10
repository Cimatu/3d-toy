import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDataDto } from '../dto/create-userData.dto';
import { UserData } from './usersData.entity';
import { UserDataService } from './usersData.service';

@ApiTags('User Data')
@Controller('user-data')
export class UserDataController {

    constructor(private userDataService: UserDataService) { }
    @ApiOperation({ summary: 'User creation' })
    @ApiResponse({ status: 200, type: UserData })
    @Post('create/:userId')
    create(@Param() eventId: number, @Body() userDataDto: CreateUserDataDto) {
        return this.userDataService.createUserData(eventId, userDataDto);
    }
}
