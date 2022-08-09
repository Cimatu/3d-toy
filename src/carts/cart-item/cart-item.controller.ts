import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Detail } from 'src/cars/details';
import { CartItemService } from './cart-item.service';


@ApiTags('Carts')
@Controller('cart-item')
export class CartItemController {

    constructor(private cartItemService: CartItemService) { }

}
