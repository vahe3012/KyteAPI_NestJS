// src/bookings/bookings.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BookingsService {
  private bookings: any[];

  constructor() {
    // Load bookings from JSON file
    const dataPath = path.join(process.cwd(), 'data/bookings.json'); // Adjust the path accordingly
    this.bookings = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  }

  getBookingById(id: number) {
    const booking = this.bookings.find((booking) => booking.id === id);
    return booking || { message: 'Booking not found' };
  }
}
