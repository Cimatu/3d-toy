import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Event } from "../events.entity";


@Entity('user-data')
export class UserData {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Dimasik", description: 'Realy?' })
    @Column({ default: null })
    firstName: string;

    @ApiProperty({ example: "Savritsky", description: 'Come on' })
    @Column({ default: null })
    lastName: string;

    @ApiProperty({ example: "dimasikgonapivasik@gmail.com", description: 'Bro, r u kidding?' })
    @Column({ default: null })
    email: string;

    @ApiProperty({ example: "Hello world", description: 'Message user send to event' })
    @Column({ default: null })
    message: string;

    @ManyToOne(() => User, (user) => user.userData, { onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

    @ApiProperty({ example: 3, description: 'User id' })
    @Column({ nullable: false })
    userId: number;

    @ManyToOne(() => Event, (event) => event.usersData, { onDelete: "CASCADE" })
    event: Event;
}
