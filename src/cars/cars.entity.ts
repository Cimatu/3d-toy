import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarBody, Spoiler, Toning, Wheel } from "./details";


@Entity('cars')
export class Car{
    @ApiProperty({ example: 1, description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.cars)
    user: User;

    @ManyToMany(() => CarBody, (bodies) => bodies.cars)
    @JoinTable()
    bodies: CarBody[];

    @ManyToMany(() => Spoiler, (spoilers) => spoilers.cars)
    @JoinTable()
    spoilers: Spoiler[];

    @ManyToMany(() => Toning, (tonings) => tonings.cars)
    @JoinTable()
    tonings: Toning[];

    @ManyToMany(() => Wheel, (wheels) => wheels.cars)
    @JoinTable()
    wheels: Wheel[];
}
