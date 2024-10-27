import { Injectable } from '@nestjs/common';
import { IUser } from '../../interfaces/user.interface';
import { IBooking } from '../../interfaces/booking.interface';
import { IFlight } from '../../interfaces/flight.interface';
import { readFile } from '../../utils/file.utils'; // Reusing utility

@Injectable()
export class UsersService {
  private readonly filePathUsers = 'data/users.json';
  private readonly filePathBookings = 'data/bookings.json';
  private readonly filePathFlights = 'data/flights.json';

  // Get user by ID with Promises
  getUserById(userId: number): Promise<IUser> {
    return readFile<IUser[]>(this.filePathUsers).then((users) => {
      const user = users.find((u) => u.id === userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      return user;
    });
  }

  // Get bookings by user ID with Promises
  getBookingsByUserId(userId: number): Promise<IBooking[]> {
    return readFile<IBooking[]>(this.filePathBookings).then((bookings) => {
      const userBookings = bookings.filter((b) => b.user_id === userId);
      if (userBookings.length === 0) {
        throw new Error(`No bookings found for user with ID ${userId}`);
      }
      return userBookings;
    });
  }

  // Get flights by user ID with Promises
  getFlightsByUserId(userId: number): Promise<IFlight[]> {
    return this.getBookingsByUserId(userId).then((bookings) =>
      readFile<IFlight[]>(this.filePathFlights).then((flights) => {
        const userFlights = flights.filter((flight) =>
          bookings.some((booking) => booking.flight_id === flight.id),
        );

        if (userFlights.length === 0) {
          throw new Error(`No flights found for user with ID ${userId}`);
        }

        return userFlights;
      }),
    );
  }
}
