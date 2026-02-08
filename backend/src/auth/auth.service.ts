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
import { PrismaService } from 'src/prisma/prisma.service';
import { UserContextService } from './user-context.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private userContext: UserContextService,
  ) {}
  private signAccessToken(userId: string, role: string) {
    return this.jwtService.sign({ sub: userId, role }, { expiresIn: '15m' });
  }

  private signRefreshToken(userId: string) {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '7d' });
  }

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
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      accessToken: this.signAccessToken(user.id, user.role),
      refreshToken: this.signRefreshToken(user.id),
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) return null;

    const context = await this.userContext.resolve(userId);

    return {
      ...user,
      isWorker: context?.isWorker ?? false,
      workerId: context?.workerId ?? null,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      return this.jwtService.sign(
        { sub: payload.sub, role: payload.role },
        { expiresIn: '15m' },
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}
