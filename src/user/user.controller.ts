import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/interfaces/user.interface';

interface RequestWithUser extends Request {
  user: IUser;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  //Create a new user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      console.log(error);
    }
  }

  //Retrieve all users
  @Get()
  findAll() {
    try {
      return this.userService.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  //Retrieve a single user
  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.userService.findOne(id);
    } catch (error) {
      console.log(error);
    }
  }

  //Update a single user
  @Put()
  async update(@Req() req: RequestWithUser, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    try {
      const id = req.user._id;
      const updatedUser = await this.userService.update(id, updateUserDto);
      return res.json(updatedUser);
    } catch (error) {
      console.log(error);
    }
  }

  //Delete a single user
  @Delete()
  async remove(@Req() req: RequestWithUser, @Res() res: Response) {
    try {
      const id = req.user._id;
    const deletedUser = await this.userService.remove(id);
    return res.json(deletedUser);
    } catch (error) {
      console.log(error);
    }
  }

  @Post("/login")
  loginUser(@Body() loginCredentials: LoginUserDto) {
    try {
      return this.userService.login(loginCredentials);
    } catch (error) {
      console.log(error);
    }
  }
}
