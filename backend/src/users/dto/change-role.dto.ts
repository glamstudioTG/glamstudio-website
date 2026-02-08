import { Role } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class ChangeUserRoleDto {
  @IsEnum(Role)
  role!: Role;
}
