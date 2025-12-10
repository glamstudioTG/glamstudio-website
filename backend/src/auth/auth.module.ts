import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtGuard, JwtStrategy, PrismaService],
  exports: [JwtGuard],
})
export class AuthModule { }
