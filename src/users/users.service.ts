import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

/*
UsersService with Callbacks
*/
@Injectable()
// export class UsersService {
//   private filePathUsers = path.join(process.cwd(), 'data/users.json');
//   private filePathBookings = path.join(process.cwd(), 'data/bookings.json');
//   private filePathFlights = path.join(process.cwd(), 'data/flights.json');
//
//   // Get user by ID using callbacks
//   getUserById(
//     userId: number,
//     callback: (error: Error | null, user?: any) => void,
//   ): void {
//     fs.readFile(this.filePathUsers, 'utf8', (err, data) => {
//       if (err) return callback(new Error('Error reading user data'));
//
//       const users = JSON.parse(data);
//       const user = users.find((u: { id: number }) => u.id === userId);
//
//       if (!user) return callback(new Error('User not found'));
//
//       callback(null, user);
//     });
//   }
//
//   // Get bookings by user ID using callbacks
//   getBookingsByUserId(
//     userId: number,
//     callback: (error: Error | null, bookings?: any) => void,
//   ): void {
//     // Check if the bookings file is accessible
//     fs.access(this.filePathBookings, fs.constants.R_OK, (accessErr) => {
//       if (accessErr) {
//         return callback(new Error('Bookings file is not accessible'));
//       }
//
//       fs.readFile(this.filePathBookings, 'utf8', (err, data) => {
//         if (err) return callback(new Error('Error reading bookings data'));
//
//         const bookings = JSON.parse(data);
//         const userBookings = bookings.filter(
//           (b: { user_id: number }) => b.user_id === userId,
//         );
//
//         if (!userBookings.length)
//           return callback(new Error('No bookings found for user'));
//
//         callback(null, userBookings);
//       });
//     });
//   }
//
//   // Get flights by user bookings using callbacks
//   getFlightsByUserId(
//     userId: number,
//     callback: (error: Error | null, flights?: any) => void,
//   ): void {
//     // First, get the user's bookings
//     this.getBookingsByUserId(userId, (bookingError, bookings) => {
//       if (bookingError) return callback(bookingError);
//
//       // Check if the flights file is accessible
//       fs.access(this.filePathFlights, fs.constants.R_OK, (accessErr) => {
//         if (accessErr) {
//           return callback(new Error('Flights file is not accessible'));
//         }
//
//         fs.readFile(this.filePathFlights, 'utf8', (err, data) => {
//           if (err) return callback(new Error('Error reading flights data'));
//
//           const allFlights = JSON.parse(data);
//           // Filter the flights by matching flight IDs from the bookings
//           const userFlights = allFlights.filter((flight: { id: number }) =>
//             bookings.some(
//               (booking: { flight_id: number }) =>
//                 booking.flight_id === flight.id,
//             ),
//           );
//
//           if (!userFlights.length)
//             return callback(new Error('No flights found for user'));
//
//           callback(null, userFlights);
//         });
//       });
//     });
//   }
// }

/*
UsersService with Promises
*/
export class UsersService {
  private filePathUsers = path.join(process.cwd(), 'data/users.json');
  private filePathBookings = path.join(process.cwd(), 'data/bookings.json');
  private filePathFlights = path.join(process.cwd(), 'data/flights.json');

  // Promise version for getUserById
  getUserById(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePathUsers, 'utf8', (err, data) => {
        if (err) return reject(new Error('Error reading user data'));

        const users = JSON.parse(data);
        const user = users.find((u: { id: number }) => u.id === userId);

        if (!user) return reject(new Error('User not found'));

        resolve(user);
      });
    });
  }

  // Promise version for getBookingsByUserId
  getBookingsByUserId(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.filePathBookings, 'utf8', (err, data) => {
        if (err) return reject(new Error('Error reading bookings data'));

        const bookings = JSON.parse(data);
        const userBookings = bookings.filter(
          (b: { user_id: number }) => b.user_id === userId,
        );

        if (!userBookings.length)
          return reject(new Error('No bookings found for user'));

        resolve(userBookings);
      });
    });
  }

  // Promise version for getFlightsByUserId
  getFlightsByUserId(userId: number): Promise<any> {
    return this.getBookingsByUserId(userId).then((bookings) => {
      return new Promise((resolve, reject) => {
        fs.readFile(this.filePathFlights, 'utf8', (err, data) => {
          if (err) return reject(new Error('Error reading flights data'));

          const allFlights = JSON.parse(data);
          const userFlights = allFlights.filter((flight: { id: number }) =>
            bookings.some(
              (booking: { flight_id: number }) =>
                booking.flight_id === flight.id,
            ),
          );

          if (!userFlights.length)
            return reject(new Error('No flights found for user'));

          resolve(userFlights);
        });
      });
    });
  }
}
