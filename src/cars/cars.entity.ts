import { ApiProperty } from "@nestjs/swagger";
import { Cart } from "src/carts/carts.entity";
import { User } from "src/users/users.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";;
import Detail from "./details/deltails.entity";


@Entity('cars')
export class Car{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.cars, {onDelete: 'CASCADE'})
    user: User;

    @ManyToMany(() => Detail, (details) => details.cars)
    @JoinTable()
    details: Detail[]
}
