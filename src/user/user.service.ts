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
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create user: ' + error.message);
    }
    
    
  }

  async findAll() {
    const users = await this.userModel.find();
    if(!users) {
      return {message:"Users not found"};
    }
    return {message:"Users found successfully",users};
  }

  async findOne(id: number) {
    const user = await this.userModel.findOne({_id:id});
    if(!user) {
      return {message:"User not found"};
    }
    return {message:"User found successfully",user};
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true});
    if(!updatedUser) {
      return {message:"Can't update the user"};
    }
    return {message:"User updated successfully",updatedUser};
  }

  async remove(id: number) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if(!deletedUser) {
      return {message:"Can't delete the user"};
    }
    return {message:"User deleted successfully",deletedUser};
  }
}
