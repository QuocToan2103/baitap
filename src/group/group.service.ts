import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { Repository } from "typeorm";
import { Group } from "./group.entity";
import { ActivityUser } from "src/activity_user/activityUser.entity";
import { CreateGroupDto } from "./dto/creategroup.dto";

@Injectable()
export class GroupsService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>, 
    @InjectRepository(ActivityUser)
    private activityUserRepository: Repository<ActivityUser>,   
    ){}

    // async creatGroup (createGroupDto: CreateGroupDto): Promise<Group>{

    // }


    async addUserToGroup(UserId: number, GroupId: number,){
        const group = await this.groupsRepository.findOneBy({id: GroupId});
        const user = await this.usersRepository.findOneBy({id: UserId});
        const oldData = {};
        group.users.push(user);
        const addMember = await this.groupsRepository.save(group);
        const changeData = this.compareObjects(oldData, addMember);

        const activityUser = new ActivityUser();
        activityUser.activityName = 'CreateMember';
        activityUser.oldData = JSON.stringify(oldData);
        activityUser.newData = JSON.stringify(addMember);
        activityUser.detailsChange = JSON.stringify(changeData);
        activityUser.created_at = new Date();
        activityUser.updated_at = new Date();

        this.activityUserRepository.save(activityUser);
        return addMember;
    }

    compareObjects(a: Record<string, any>, b: Record<string, any>): Record<string, any> {
        const result: Record<string, any> = {};
      
        // Get the keys of object a and b
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
      
        // Compare the values of each key in object a and b
        for (let key of aKeys) {
          // If the value of the key in both objects is an object, use recursion to compare their values
          if (typeof a[key] === "object" && typeof b[key] === "object") {
            const subResult = this.compareObjects(a[key], b[key]);
            if (Object.keys(subResult).length > 0) {
              result[key] = subResult;
            }
          } else if (a[key] !== b[key]) {
            result[key] = { oldValue: a[key], newValue: b[key] };
          }
        }
      
        // Check for keys in object b that are not in object a
        for (let key of bKeys) {
          if (!aKeys.includes(key)) {
            result[key] = { newValue: b[key] };
          }
        }
      
        // Check for keys in object a that are not in object b
        for (let key of aKeys) {
          if (!bKeys.includes(key)) {
            result[key] = { oldValue: a[key] };
          }
        }
      
        return result;
      }
    
}