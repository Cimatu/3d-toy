import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity('video')
export class Video {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Our toys', description: 'Video name' })
    @Column({ default: 0 })
    name: string;

    @ApiProperty({example: 'https://www.youtube.com/watch?v=VoR8N6AKjsI&ab_channel=%D0%9A%D0%B8%D0%BD%D0%BE%D0%BF%D0%BE%D0%B8%D1%81%D0%BA', description: 'Video link'})
    @Column()
    url: string;
}
