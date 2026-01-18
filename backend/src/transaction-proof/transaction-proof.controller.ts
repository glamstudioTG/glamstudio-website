import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { TransactionProofService } from './transaction-proof.service';
import { UploadTransactionProofDto } from './dto/upload-transaction-proof.dto';
import { ReviewTransactionProofDto } from './dto/review-transaction-proof.dto';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('booking')
export class TransactionProofController {
  constructor(private service: TransactionProofService) {}

  @Post(':id/transaction-proof')
  uploadProog(
    @Param('id') bookingId: string,
    @Body() dto: UploadTransactionProofDto,
  ) {
    return this.service.uploadProof(bookingId, dto.imageUrl);
  }

  @UseGuards(AdminOrWorkerGuard)
  @Patch(':id/review')
  reviewProof(
    @Param('id') proofId: string,
    @Body() dto: ReviewTransactionProofDto,
    @Req() req,
  ) {
    return this.service.reviewProof(proofId, dto.status, req.user.id);
  }

  @UseGuards(AdminOrWorkerGuard)
  @Get(':id')
  getTransactionProofInfo(@Param('id') proofId: string) {
    return this.service.getInfoTransactionProof(proofId);
  }
}
