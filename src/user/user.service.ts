import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      await this.userModel.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
    
    
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
