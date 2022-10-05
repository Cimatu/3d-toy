import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

    constructor(private notificationsService: NotificationsService) { }

    @ApiOperation({ summary: 'Order creation' })
    @ApiResponse({ status: 200, type: Notification })
    @Post('create')
    create(@Body() dto: CreateNotificationDto) {
        return this.notificationsService.createNotification(dto);
    }
}
