import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';


@ApiTags('Cart item')
@Controller('cart-item')
export class CartItemController {

    constructor(private cartItemService: CartItemService) { }

    @ApiOperation({ summary: 'Add whole car to cart by user id' })
    @ApiResponse({ status: 200, type: CartItem })
    @Get('get_cart-items_by_cartId')
    addCarToCart(@Query('cartId') cartId: number ) {
        return this.cartItemService.getCartItemsByCartID(cartId);
    }
}
