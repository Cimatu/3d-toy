import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Car } from "../cars.entity";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
class Detail {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Car, (cars) => cars.details)
    cars: Car[];

    // @OneToMany(() => CartItem, (cartItem) => cartItem.detail)
    // cartItems: CartItem[]
}

export default Detail
