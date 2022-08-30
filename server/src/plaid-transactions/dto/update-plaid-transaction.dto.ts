import { PartialType } from '@nestjs/mapped-types';
import { CreatePlaidTransactionDto } from './create-plaid-transaction.dto';

export class UpdatePlaidTransactionDto extends PartialType(
  CreatePlaidTransactionDto,
) {}
