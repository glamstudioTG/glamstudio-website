import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from 'src/auth/types/auth-user.type';
import { UpdateUserDto } from './dto/update-role.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ChangeUserRoleDto } from './dto/change-role.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('/me')
  getMyProfile(@CurrentUser() user: AuthUser) {
    return this.userService.getProfile(user.sub);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Get('/all')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(JwtGuard)
  @Patch('me/update')
  updateMyProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    return this.userService.updateProfile(user.sub, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch('admin/users/:id/role')
  changeUserRole(@Param('id') userId: string, @Body() dto: ChangeUserRoleDto) {
    return this.userService.changeUserRole(userId, dto);
  }
}
