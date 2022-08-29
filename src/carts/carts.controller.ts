import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Cart } from './carts.entity';


@ApiTags('Carts')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { }

    @ApiOperation({ summary: 'Update cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('update')
    update(@Body() body: { id: number, array: InterfaceDetail[] }) {
        return this.cartService.updateCart(body.id, body.array);
    }

    @ApiOperation({ summary: 'Delete cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Delete('delete')
    delete(@Body() body: { id: number, array: InterfaceDetail[] }) {
        return this.cartService.deleteFromCart(body.id, body.array);
    }

    @ApiOperation({ summary: 'Get cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Get('get_by_user_id')
    getByUserId(@Body() body: { id: number }) {
        return this.cartService.getCartByUserId(body.id);
    }
}
