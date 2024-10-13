// src/payments/payments.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PaymentsService {
  private payments: any[];

  constructor() {
    // Load payments from JSON file
    const dataPath = path.join(process.cwd(), 'data/payments.json');
    this.payments = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  getPaymentById(id: number) {
    const payment = this.payments.find((payment) => payment.id === id);
    return payment || { message: 'Payment not found' };
  }
}
