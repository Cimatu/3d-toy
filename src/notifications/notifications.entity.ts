import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";


@Entity('notifications')
export class Notification {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Something important", description: 'Notification title' })
    @Column({ nullable: false })
    name: string;

    @ApiProperty({ example: 'hello there', description: "Text for notification" })
    @Column({ nullable: false })
    text: string;

    @ApiProperty({ example: '2022-10-10', description: "Timestamp" })
    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => User)
    @JoinTable()
    users: User[];
}
