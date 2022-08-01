import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cart } from './carts.entity';
import { CartsService } from './carts.service';

@ApiTags('Carts')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { }

    @ApiOperation({ summary: 'Cart creation' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('create/:username')
    create() {
        return this.cartService.createCart();
    }

    @ApiOperation({ summary: `Get list of all wheels` })
    @ApiResponse({ status: 200, type: [Cart] })
    @Get('get_all')
    getAll() {
        return this.cartService.getAllWheels();
    }

    @ApiOperation({ summary: `Get wheel by name` })
    @ApiResponse({ status: 200, type: Cart })
    @Get('/:name')
    getByValue(@Param('name') name: string) {
        return this.cartService.getWheelByName(name);
    }
}
