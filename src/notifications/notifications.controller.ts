import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SetUserDto } from './dto/set-user.dto';
import { Notification } from './notifications.entity';
import { NotificationsService } from './notifications.service';


@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {

    constructor(private notificationsService: NotificationsService) { }

    @ApiOperation({ summary: 'Create notification' })
    @ApiResponse({ status: 200, type: Notification })
    @Post('create')
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.createNotification(dto);
    }

    @ApiOperation({ summary: 'Update notification by id' })
    @ApiResponse({ status: 200, type: Notification })
    @Post('update/:id')
    update(@Param('id') id: number, @Body() dto: CreateNotificationDto) {
        return this.notificationsService.updateNotificationById(id, dto);
    }

    @ApiOperation({ summary: 'Delete notification by id' })
    @ApiResponse({ status: 200 })
    @Delete('delete/:id')
    detele(@Param('id') id: number) {
        return this.notificationsService.deleteNotificationById(id);
    }

    @ApiOperation({ summary: `Get notifications list` })
    @ApiResponse({ status: 200, type: [Notification] })
    @Get('get_all')
    getAll() {
        return this.notificationsService.getAllNotifications();
    }

    @ApiOperation({ summary: 'Get one single notification by its id' })
    @ApiResponse({ status: 200, type: Notification })
    @Get('get_one/:id')
    getOne(@Param('id') id: number) {
        return this.notificationsService.getNotificationsById(id);
    }

    @ApiOperation({ summary: 'Set seen notification' })
    @ApiResponse({ status: 200, type: Notification })
    @Post('set_user')
    setUser(@Body() dto: SetUserDto) {
        return this.notificationsService.setSeenNotification(dto);
    }

    @ApiOperation({ summary: 'Get unseen notifications by user Id' })
    @ApiResponse({ status: 200, type: [Notification] })
    @Get('get_unseen/:userId')
    getUnseenNotifications(@Param('userId') userId: number) {
        return this.notificationsService.getUnseenNotifications(userId);
    }

}
