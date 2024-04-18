import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { Auth } from 'src/utils/auth';

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true});
    console.log(updatedUser);
    if(!updatedUser) {
      return {message:"Can't update the user"};
    }
    return {message:"User updated successfully",updatedUser};
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if(!deletedUser) {
      return {message:"Can't delete the user"};
    }
    return {message:"User deleted successfully",deletedUser};
  }

  async login(loginCredentials:LoginUserDto) {
    const {email,password} = loginCredentials;
    const user = await this.userModel.findOne({email});
    if(!user) {
      return {message:"User not found"};
    }
    if(user.password !== password) {
      return {message:"Incorrect password"};
    }
    const obj = {
      id:user._id,
      name:user.name,
      email:user.email,
      password:user.password,
    }
    const token = await new Auth().generateToken(obj);
    if(token) {
      return {message:"User logged in sucessfully",token}
    }
    
  }
}
