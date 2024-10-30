import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user:Repository<User>){}
  create(createUserDto: CreateUserDto) {
    return this.user.save(createUserDto)
  }

  findAll(params:string) {
    const res=this.user.find({
      where:{
        name:Like(`%${params}%`)
      }
    })
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
