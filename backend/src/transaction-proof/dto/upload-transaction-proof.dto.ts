import { IsUrl } from 'class-validator';

export class UploadTransactionProofDto {
  @IsUrl()
  imageUrl!: string;
}
