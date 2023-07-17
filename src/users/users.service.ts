import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { ActivityUser } from 'src/activity_user/activityUser.entity';
import { promises } from 'dns';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ActivityUser)
    private activityUserRepository: Repository<ActivityUser>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

 

  async create(createUserDto: CreateUserDto): Promise<User> {
    const oldData = {};
    const newData = await this.usersRepository.save(createUserDto);
    const changeData = this.compareObjects(oldData, newData);
    const activityUser = new ActivityUser();
    activityUser.activityName = 'CreateUser';
    activityUser.oldData = JSON.stringify(oldData);
    activityUser.newData = JSON.stringify(newData);
    activityUser.detailsChange = JSON.stringify(changeData);
    activityUser.created_at = new Date();
    activityUser.updated_at = new Date();
    
    this.activityUserRepository.save(activityUser);
    return newData;
  }

  async update(id: number, updateUserDto:UpdateUserDto): Promise<User>{
    const oldData = await this.usersRepository.findOneBy({id: id});
    const newData = await this.usersRepository.save({...oldData, ...updateUserDto});
    const changeData = this.compareObjects(oldData, newData);

    const activityUser = new ActivityUser();
    activityUser.activityName = 'UpdateUser';
    activityUser.oldData = JSON.stringify(oldData);
    activityUser.newData = JSON.stringify(newData);
    activityUser.detailsChange = JSON.stringify(changeData);
    activityUser.created_at = new Date();
    activityUser.updated_at = new Date();
    
    this.activityUserRepository.save(activityUser);
    return newData;
  }

  async remove(id: number): Promise<string> {
    const user = await this.usersRepository.delete(id);
    const newData = {};
    const changeData = this.compareObjects(user, newData);
    if(user.affected === 0) {
      throw new NotFoundException(`không tìm thấy id:${id} của người dùng`);
    }
    const activityUser = new ActivityUser();
    activityUser.activityName = 'DeleteUser';
    activityUser.oldData = JSON.stringify(user);
    activityUser.newData = JSON.stringify(newData);
    activityUser.detailsChange = JSON.stringify(changeData);
    activityUser.created_at = new Date();
    activityUser.updated_at = new Date();
    
    this.activityUserRepository.save(activityUser);
    return `Vừa xoá thành công id:${id} của người dùng`;
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