import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDataService } from './usersData.service';
import { UserData } from './usersData.entity';
import { CreateUserDataDto } from '../dto/create-userData.dto';


@ApiTags('User Data')
@Controller('user-data')
export class UserDataController {

    constructor(private userDataService: UserDataService) { }

    @ApiOperation({ summary: 'Create user data for form in events' })
    @ApiResponse({ status: 200, type: UserData })
    @Post('create/:userId')
    create(@Param('userId') eventId: number, @Body() userDataDto: CreateUserDataDto) {
        return this.userDataService.createUserData(eventId, userDataDto);
    }

    @ApiOperation({ summary: 'Get all user data by user id' })
    @ApiResponse({ status: 200, type: [UserData] })
    @Get('get_all_by_user/:userId')
    getUserDataByUser(@Param('userId') eventId: number) {
        return this.userDataService.getUserDataByUser(eventId);
    }

    @ApiOperation({ summary: 'Get all user data by event id' })
    @ApiResponse({ status: 200, type: [UserData] })
    @Get('get_all_by_event/:eventId')
    getUserDataByEvent(@Param('eventId') eventId: number) {
        return this.userDataService.getUserDataByEvent(eventId);
    }
}
