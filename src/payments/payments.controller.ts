// src/payments/payments.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get(':id') // Fetch payment by ID
  getPaymentById(@Param('id') id: number) {
    return this.paymentsService.getPaymentById(id);
  }
}
