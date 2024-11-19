import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import { Public } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly user: Repository<User>) { }
  async create(createUserDto: CreateUserDto) {
    const res=await this.user.save(createUserDto)
    if(res){
      return '添加成功'
    }
  }

  async findAll(params: string) {
    const res =await this.user.find({
      where: {
        name: Like(`%${params}%`)
      }
    })
    console.log(res);
    
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
