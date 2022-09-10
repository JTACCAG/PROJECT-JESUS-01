import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @FormDataRequest()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  findAll(@Req() request: Request) {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Req() request: Request) {
    return this.userService.findOne(request['query'].id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @FormDataRequest()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Req() request: Request) {
    return this.userService.remove(request['query'].id);
  }
}
