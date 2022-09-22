import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserData } from "./usersData/usersData.entity";


@Entity('events')
export class Event {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Car toys Tournament In China", description: 'Event name' })
    @Column()
    name: string;

    @ApiProperty({ example: "16 Sept 2020", description: 'Event date' })
    @Column()
    date: string;

    @ApiProperty({ example: "Lorem ipsum", description: 'Event description' })
    @Column()
    description: string;

    @ApiProperty({ example: "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg", description: 'Url to event image' })
    @Column()
    img: string;

    @OneToMany(() => UserData, (usersData) => usersData.event)
    @JoinTable()
    usersData: UserData[];
}
