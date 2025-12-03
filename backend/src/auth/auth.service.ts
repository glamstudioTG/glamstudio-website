import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: registerDto) {
    const exists = await this.userService.findByEmail(dto.email);
    if (exists) {
      throw new UnprocessableEntityException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userService.createUser({
      ...dto,
      password: hashedPassword,
    });
  }

  async login(dto: loginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
