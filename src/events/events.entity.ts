import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserData } from "./usersData/usersData.entity";


@Entity('events')
export class Event {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    // @ApiProperty({ example: 50, description: 'Price of all parts of the car in cart' })
    @Column()
    name: string;

    @Column()
    date: string;

    @Column()
    description: string;

    @Column()
    img: string

    @ManyToOne(() => UserData, (usersData) => usersData.event)
    usersData: UserData[]
}
