import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Event } from "../events.entity";


@Entity('user-data')
export class UserData {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Dimasik", description: 'Realy?' })
    @Column({ default: 0 })
    firstName: string;

    @ApiProperty({ example: "Savritsky", description: 'Come on' })
    @Column({ length: 500 })
    lastName: string;

    @ApiProperty({ example: "dimasikgonapivasik@gmail.com", description: 'Bro, r u kidding?' })
    @Column()
    email: string;

    @ApiProperty({ example: "Hello world", description: 'Message user send to event' })
    @Column()
    message: string;

    @ManyToOne(() => User, (user) => user.userData, { onDelete: "CASCADE" })
    user: User;

    @ManyToOne(() => Event, (event) => event.usersData, { onDelete: "CASCADE" })
    event: Event
}
