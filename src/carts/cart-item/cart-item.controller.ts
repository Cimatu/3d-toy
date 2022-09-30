import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';


@ApiTags('Cart item')
@Controller('cart-item')
export class CartItemController {

    constructor(private cartItemService: CartItemService) { }

    @ApiOperation({ summary: 'Add quantity to cart item' })
    @ApiResponse({ status: 200, type: CartItem })
    @Post('add_quantity')
    addQuantity(@Query('detailId') detailId: number, @Query('userId') userId: number) {
        return this.cartItemService.addQuantity(detailId, userId);
    }

    @ApiOperation({ summary: 'Take quantity from cart item' })
    @ApiResponse({ status: 200, type: CartItem })
    @Post('take_quantity')
    takeQuantity(@Query('detailId') detailId: number, @Query('userId') userId: number) {
        return this.cartItemService.takeQuantity(detailId, userId);
    }

    @ApiOperation({ summary: 'Delete cart item' })
    @ApiResponse({ status: 200, type: CartItem })
    @Delete('delete_cart_item')
    deleteCartItem(@Query('detailId') detailId: number, @Query('userId') userId: number ) {
        return this.cartItemService.deteleCartItem(detailId, userId);
    }

    @ApiOperation({ summary: 'Get one cart items by detail and user Id' })
    @ApiResponse({ status: 200, type: [CartItem] })
    @Get('get_cart-item')
    getCartItemByDetailAndUserId(@Query('detailId') detailId: number, @Query('userId') userId: number) {
        return this.cartItemService.getCartItemByDetailAndUserId(detailId, userId);
    }

    @ApiOperation({ summary: 'Get all cart items by user Id' })
    @ApiResponse({ status: 200, type: [CartItem] })
    @Get('get_cart-items_by_userId')
    getCartItemsByUserId(@Query('userId') userId: number) {
        return this.cartItemService.getCartItemsByUserId(userId);
    }

}
