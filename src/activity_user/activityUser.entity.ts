import { User } from "src/users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ActivityUser {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user)  => user.activityusers)
    user: User;

    @Column()
    activityName: string;

    @Column()
    oldData: string;

    @Column()
    newData: string;

    @Column()
    detailsChange: string;

    @Column()
    relation: string;
    
    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;
  
}