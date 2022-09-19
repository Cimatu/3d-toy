import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Detail } from "../deltails.entity";


@Entity('types')
export class Type {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Roller", description: 'Type name' })
    @Column({ unique: true })
    name: string;

    @ApiProperty({ example: "https://klike.net/uploads/posts/2019-05/1556708032_1.jpg", description: 'Type image' })
    @Column({ default: null })
    img: string

    @ApiProperty({ description: 'Array with all details' })
    @OneToMany(() => Detail, details => details.type)
    @JoinTable()
    details: Detail[];
}
