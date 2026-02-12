import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { TransactionProofService } from './transaction-proof.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminTransactionProofQueryDto } from './dto/admin-transaction-proof-query.dto';

@UseGuards(JwtGuard, AdminGuard)
@Controller('admin/transaction-proofs')
export class TransactionProofAdminController {
  constructor(private service: TransactionProofService) {}

  @Get()
  getAll(@Query() query: AdminTransactionProofQueryDto) {
    return this.service.getAdminList(query);
  }
}
