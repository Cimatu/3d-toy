import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CartItemService } from './cart-item.service';


@ApiTags('Cart item')
@Controller('cart-item')
export class CartItemController {

    constructor(private cartItemService: CartItemService) { }

}
