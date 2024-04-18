import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { Auth } from 'src/utils/auth';
import { Message } from 'src/constants/responseMessage';

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
      return { status: true, statusCode: HttpStatus.CREATED, data: user, message: Message.CREATE_USER };
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }


  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      if (!users) {
        return { message: "Users not found" };
      }
      return { status: true, statusCode: HttpStatus.OK, data: users, message: Message.USER_DETAILS };
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.userModel.findOne({ _id: id });
      if (!user) {
        return { status: false, statusCode: HttpStatus.NOT_FOUND, data: user, message: Message.USER_NOT_FOUND };
      }
      return { status: true, statusCode: HttpStatus.OK, data: user, message: Message.USER_DETAILS };
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
      if (!updatedUser) {
        return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, data: updatedUser, message: Message.ERR_MSG };
      }
      return { status: true, statusCode: HttpStatus.OK, data: updatedUser, message: Message.UPDATE_USER };
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }

  async remove(id: string) {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, data: deletedUser, message: Message.ERR_MSG };
      }
      return {status:true,statusCode:HttpStatus.OK,data:deletedUser,message:Message.DELETE_USER};
    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }
    }
  

  async login(loginCredentials: LoginUserDto) {
    try {
      const { email, password } = loginCredentials;
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { status: false, statusCode: HttpStatus.NOT_FOUND, data: email, message: Message.USER_NOT_FOUND };
    }
    const isPasswordMatch = await new Auth().comparePassword(password, user.password);

    if (!isPasswordMatch) {
      return { status: false, statusCode: HttpStatus.UNAUTHORIZED, data: email, message: Message.PASSWORD_NOT_MATCH };
    }

    const obj = {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    }
    const token = await new Auth().generateToken(obj);
    if (token) {
      return {status:true,statusCode:HttpStatus.OK,data:user,message:Message.LOGIN,token};
    }

    } catch (error) {
      console.log(error);
      return { status: false, statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }
}
