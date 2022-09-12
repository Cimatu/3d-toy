import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity('news')
export class News {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: "Car toys Tournament In China", description: 'News name' })
    @Column()
    name: string;

    @ApiProperty({ example: "16 Sept 2020", description: 'News date' })
    @Column()
    date: string;

    @ApiProperty({ example: "Lorem ipsum", description: 'News text' })
    @Column()
    text: string;
}
