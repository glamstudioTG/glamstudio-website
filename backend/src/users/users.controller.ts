import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { registerUserDto } from './dto/register-user.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/profile')
  getProfile(@Param('id') id: string) {
    return this.userService.findProfile(id);
  }

  @Get()
  getUserByEmail() {}

  @Post('/register')
  registerUser(@Body() dto: registerUserDto) {
    return this.userService.createUser(dto);
  }
}
