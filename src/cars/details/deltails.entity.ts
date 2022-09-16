import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Car } from "../cars.entity";
import { Type } from "./types/types.entity";


@Entity('details')
// @TableInheritance({ column: { type: "varchar", name: "type" } })
export class Detail {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Car, (cars) => cars.details)
    cars: Car[];

    @ApiProperty({ example: 'spoiler', description: 'Detail type' })
    @ManyToOne(() => Type, (type) => type.details, { onDelete: "SET NULL" })
    @JoinColumn()
    type: Type

    @ApiProperty({ example: 'Prime', description: 'Unique detail name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: "Red" })
    @Column({ default: null })
    color: string;

    @ApiProperty({ example: '570*465*285mm', description: 'Detail dimmensions' })
    @Column({ default: null })
    dimmensions: string;

    @ApiProperty({ example: 100, description: 'Detail price' })
    @Column()
    price: number;

    @ApiProperty({ example: "Any url", description: 'Detail image' })
    @Column({ default: null })
    img: string;

    @ApiProperty({
        example: `
    This component is in different colors 
    (Orange, Black, Silver, Red and Golden) 
    in the app shall be shown all`,
        description: 'Detail note'
    })
    @Column({ default: null })
    note: string;
}
