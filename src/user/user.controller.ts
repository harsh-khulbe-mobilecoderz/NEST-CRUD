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
  constructor(private readonly userService: UserService) {}

  //Create a new user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  //Retrieve all users
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  //Retrieve a single user
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  //Update a single user
  @Put()
  async update(@Req() req:RequestWithUser,@Res() res:Response, @Body() updateUserDto: UpdateUserDto) {
    // console.log("Hello")
    // console.log(req);
    const id = req.user._id;
    console.log(id);
    // console.log(req.user,"req.user");
    // console.log(req.user._id);
    const updatedUser = await this.userService.update(id, updateUserDto);
    return res.json(updatedUser);
  }

  //Delete a single user
  @Delete()
  async remove(@Req() req:RequestWithUser,@Res() res:Response) {
    const id = req.user._id;
    const deletedUser= await this.userService.remove(id);
    return res.json(deletedUser);
  }

  @Post("/login")
  loginUser(@Body() loginCredentials:LoginUserDto) {
    return this.userService.login(loginCredentials);
  }
}
