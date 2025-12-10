import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
<<<<<<< HEAD
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
=======
import { PrismaService } from 'src/prisma/prisma.service';
>>>>>>> login-of-user-and-auth

@Module({
  imports: [
    ConfigModule,
    PassportModule,

    UsersModule,

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AuthController],
<<<<<<< HEAD

  providers: [
    AuthService,
    JwtGuard,
    JwtStrategy,
  ],

=======
  providers: [AuthService, UserService, JwtGuard, JwtStrategy, PrismaService],
>>>>>>> login-of-user-and-auth
  exports: [JwtGuard],
})
export class AuthModule {}
