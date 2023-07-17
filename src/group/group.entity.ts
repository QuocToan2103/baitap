import { User } from "src/users/users.entity";
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity() 
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    groupName: string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.groups)
    users: User[];
}