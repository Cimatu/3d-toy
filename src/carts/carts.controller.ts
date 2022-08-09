import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Detail } from 'src/cars/details';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { }

    // @ApiOperation({ summary: 'Cart creation' })
    // @ApiResponse({ status: 200, type: Cart })
    // @Post('create/:username')
    // create() {
    //     return this.cartService.createCart();
    // }

    @ApiOperation({ summary: 'Get cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('update')
    update(@Body() body: { id: number, array: InterfaceDetail[] }) {
        return this.cartService.updateCart(body.id, body.array);
    }

    @ApiOperation({ summary: 'Get cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Delete('delete')
    delete(@Body() body: { id: number, array: InterfaceDetail[] }) {
        return this.cartService.deleteFromCart(body.id, body.array);
    }

    @ApiOperation({ summary: 'Get cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('get_by_user')
    getByUser(@Body() body: { id: number, array: InterfaceDetail[] }) {
        return this.cartService.updateCart(body.id, body.array);
    }
}
