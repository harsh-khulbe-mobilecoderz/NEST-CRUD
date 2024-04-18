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
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const { name, email, password } = createUserDto;
      const hashedPassword = await new Auth().encryptPassword(password);
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword
      });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create user: ' + error.message);
    }


  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      if (!users) {
        return { message: "Users not found" };
      }
      return { message: "Users found successfully", users };
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        return { message: "User not found" };
      }
      return { message: "User found successfully", user };
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      if (!updatedUser) {
        return { message: "Can't update the user" };
      }
      return { message: "User updated successfully", updatedUser };
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return { message: "Can't delete the user" };
      }
      return { message: "User deleted successfully", deletedUser };
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginCredentials: LoginUserDto) {
    try {
      const { email, password } = loginCredentials;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { message: "User not found" };
    }
    const isPasswordMatch = await new Auth().comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return { message: "Incorrect password" };
    }

    const obj = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    }
    const token = await new Auth().generateToken(obj);
    if (token) {
      return { message: "User logged in sucessfully", token }
    }

    } catch (error) {
      console.log(error);
    }
  }
}
