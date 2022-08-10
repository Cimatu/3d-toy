import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../events.entity";


@Entity('user-data')
export class UserData {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    // @ApiProperty({ example: 50, description: 'Price of all parts of the car in cart' })
    @Column({ default: 0 })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    // @Column()
    // visitor: string

    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.userData, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Event, (event) => event.usersData, { onDelete: "CASCADE" })
    event: Event
}
