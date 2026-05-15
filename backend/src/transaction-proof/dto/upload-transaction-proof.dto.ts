import { IsUrl } from 'class-validator';

export class UploadTransactionProofDto {
  @IsUrl(
    {
      require_tld: true,
      require_protocol: true,
      protocols: ['https'],
    },
    { message: 'imageUrl debe ser una URL HTTPS válida' },
  )
  imageUrl!: string;
}
