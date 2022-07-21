import { ApiProperty } from "@nestjs/swagger";
import { Car } from "src/cars/cars.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";

@Entity('users')
export class User{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ example: 'destroyer3000', description: 'Unique username' })
    @Column({ unique: true })
    username: string;

    @ApiProperty({ example: true, description: 'Banned or not' })
    @Column()
    banned: boolean;

    @ApiProperty({ example: 'Spam', description: 'Reason for blocking' })
    @Column()
    banReason: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    role: Role;

    @OneToMany(() => Car, (car) => car.user)
    cars: Car[];
}
