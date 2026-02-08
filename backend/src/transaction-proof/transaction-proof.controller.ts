import {
  Controller,
  Post,
  Param,
  Body,
  Patch,
  Req,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TransactionProofService } from './transaction-proof.service';
import { UploadTransactionProofDto } from './dto/upload-transaction-proof.dto';
import { ReviewTransactionProofDto } from './dto/review-transaction-proof.dto';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { TransactionProofReviewerGuard } from 'src/auth/guards/TransactionProof-Reviewer.guard';
import { TransactionProofQueryDto } from './dto/transaction-proof-query.dto';

@Controller('booking')
export class TransactionProofController {
  constructor(private service: TransactionProofService) {}

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Get('worker/:workerId/pending')
  getPending(
    @Param('workerId') workerId: string,
    @Query() query: TransactionProofQueryDto,
  ) {
    return this.service.getPending(workerId, query);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Get('worker/:workerId/history')
  getHistory(
    @Param('workerId') workerId: string,
    @Query() query: TransactionProofQueryDto,
  ) {
    return this.service.getHistory(workerId, query);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Get(':id')
  getTransactionProofInfo(@Param('id') proofId: string) {
    return this.service.getInfoTransactionProof(proofId);
  }

  @Post(':id/transaction-proof')
  uploadProof(
    @Param('id') bookingId: string,
    @Body() dto: UploadTransactionProofDto,
  ) {
    return this.service.uploadProof(bookingId, dto.imageUrl);
  }

  @UseGuards(JwtGuard, TransactionProofReviewerGuard)
  @Patch(':id/review')
  reviewProof(
    @Param('id') proofId: string,
    @Body() dto: ReviewTransactionProofDto,
    @Req() req,
  ) {
    return this.service.reviewProof(proofId, dto.status, req.user.id);
  }
}
