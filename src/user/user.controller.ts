import { Controller, Get, Post, Body, Param, Delete, Put, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/interfaces/user.interface';
import ResponseHelper from 'src/helpers/responseHelper';

interface RequestWithUser extends Request {
  user: IUser;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //Create a new user
  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return ResponseHelper.responseHandler(res, user.statusCode, user.status, user.message, user.data);
    } catch (error) {
      console.log(error);
    }
  }

  //Retrieve all users
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.userService.findAll();
      return ResponseHelper.responseHandler(res, users.statusCode, users.status, users.message, users.data);
    } catch (error) {
      console.log(error);
      return ResponseHelper.responseHandler(res, error.statusCode, error.status, error.message, error);
    }
  }

  //Retrieve a single user
  @Get(':id')
  async findOne(@Res() res: Response, @Param('id') id: number) {
    try {
      const user = await this.userService.findOne(id);
      return ResponseHelper.responseHandler(res, user.statusCode, user.status, user.message, user.data);
    } catch (error) {
      console.log(error);
      return ResponseHelper.responseHandler(res, error.statusCode, error.status, error.message, error);
    }
  }

  //Update a single user
  @Put()
  async update(@Req() req: RequestWithUser, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    try {
      const id = req.user._id;
      const updatedUser = await this.userService.update(id, updateUserDto);
      return ResponseHelper.responseHandler(res, updatedUser.statusCode, updatedUser.status,
        updatedUser.message, updatedUser.data);

    } catch (error) {
      console.log(error);
      return ResponseHelper.responseHandler(res, error.statusCode, error.status, error.message, error);
    }
  }

  //Delete a single user
  @Delete()
  async remove(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const id = req.user._id;
      const deletedUser = await this.userService.remove(id);
      return ResponseHelper.responseHandler(res,deletedUser.statusCode,deletedUser.status,
      deletedUser.data, deletedUser.message);
    } catch (error) {
      console.log(error);
      return ResponseHelper.responseHandler(res, error.statusCode, error.status, error.message, error);
    }
  }

  @Post("/login")
  async loginUser(@Res() res:Response, @Body() loginCredentials: LoginUserDto) {
    try {
    const login = await this.userService.login(loginCredentials);
    return ResponseHelper.responseHandler(res, login.statusCode, login.status, login.message, login.data, login.token);
    } catch (error) {
      console.log(error);
      return ResponseHelper.responseHandler(res, error.statusCode, error.status, error.message, error);
    }
  }
}
