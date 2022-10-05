import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity('botifications')
export class Notification {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 50, description: 'Price of all parts of the car in order' })
    @Column()
    name: string;

    @ApiProperty({example: 'Taiwan', description: "Country to deliver the order"})
    @Column()
    text: string;

    @ApiProperty({example: 'Taibei', description: "City to deliver the order"})
    @Column()
    date: Date;
}
