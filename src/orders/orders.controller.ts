import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { CreateOrderDto } from './dto/create-order.dto';


@ApiTags('Orders')
@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) { }

    @ApiOperation({ summary: 'Order creation' })
    @ApiResponse({ status: 200, type: Order })
    @Post('create')
    create(@Body() dto: CreateOrderDto) {
        return this.ordersService.createOrder(dto);
    }
}
