import { Controller, Get, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get(':id')
  getBookingById(@Param('id') id: string) {
    const bookingId = Number(id); // Convert to a number
    return this.bookingsService.getBookingById(bookingId);
  }
}
