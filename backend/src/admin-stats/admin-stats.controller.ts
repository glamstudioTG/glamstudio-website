import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminStatsService } from './admin-stats.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard, AdminGuard)
@Controller('admin/dashboard')
export class AdminStatsController {
  constructor(private readonly adminStatsService: AdminStatsService) {}

  @Get('stats')
  async getStats() {
    return this.adminStatsService.getStats();
  }

  @Get('service/stats')
  async getServiceStats() {
    return this.adminStatsService.getServiceStats();
  }
}
