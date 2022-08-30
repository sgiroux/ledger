import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PlaidItemsService } from './plaid-items.service';

@Controller('plaid/items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PlaidItemsController {
  constructor(private readonly plaidItemsService: PlaidItemsService) {}
}
