import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";


@Entity('FAQs')
export class FAQ {
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'Our toys', description: 'FAQ name' })
    @Column({ default: 0 })
    name: string;

    @ApiProperty({example: 'Текста пока нет', description: 'FAQ text'})
    @Column()
    text: string;
}
