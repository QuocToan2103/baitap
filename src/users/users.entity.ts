import { ActivityUser } from 'src/activity_user/activityUser.entity';
import { Group } from 'src/group/group.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeUpdate, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  
  @OneToMany(() => ActivityUser, (activityuser) => activityuser.user)
  activityusers: ActivityUser[];
  
  @ManyToMany(type => Group, group => group.users)
  @JoinTable()
  groups: Group[];
 

}