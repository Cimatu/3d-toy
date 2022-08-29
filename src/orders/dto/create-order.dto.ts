import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/carts/carts.entity";


export class CreateOrderDto {
    @ApiProperty({ example: 'Taiwan', description: "Country to deliver the order" })
    country: string;

    @ApiProperty({ example: 'Taibei', description: "City to deliver the order" })
    city: string;

    @ApiProperty({ description: "User's cart to get quantity, total and cart items" })
    cart: Cart;
}
