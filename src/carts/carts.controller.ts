import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { Cart } from './carts.entity';
import { AddCarDto, AddNewItemDto } from './dto/update.dto';


@ApiTags('Carts')
@Controller('carts')
export class CartsController {

    constructor(private cartService: CartsService) { }

    @ApiOperation({ summary: 'Add whole car to cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('add_car')
    addCarToCart(@Body() dto: AddCarDto) {
        return this.cartService.addCarToCart(dto.userId, dto.detailsIds);
    }

    @ApiOperation({ summary: 'Add new item to cart' })
    @ApiResponse({ status: 200, type: Cart })
    @Post('add_item')
    addToCart(@Body() dto: AddNewItemDto) {
        return this.cartService.addToCart(dto.userId, dto.detailId);
    }

    @ApiOperation({ summary: 'Delete from cart by user id' })
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

    @ApiOperation({ summary: 'Get cart by user id' })
    @ApiResponse({ status: 200, type: Cart })
    @Get('get_all')
    getAll() {
        return this.cartService.getAll();
    }
}
