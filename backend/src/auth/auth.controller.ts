import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  authLogin(dto: loginDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  authRegister(dto: registerDto) {
    return this.authService.register(dto);
  }
}
