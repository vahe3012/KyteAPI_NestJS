import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { IBooking } from '../../interfaces/booking.interface';
import { IFlight } from '../../interfaces/flight.interface';

// UsersController with Callbacks
@Controller('api/user')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}
//
//   // Handle the route to get user, bookings, and flights with callbacks
//   @Get(':id')
//   getUserByIdWithCallbacks(@Param('id') id: string, @Res() res: Response) {
//     const userId = Number(id);
//
//     this.usersService.getUserById(userId, (userError, user) => {
//       if (userError) {
//         return res.status(500).json({ message: userError.message });
//       }
//
//       this.usersService.getBookingsByUserId(
//         userId,
//         (bookingsError, bookings) => {
//           if (bookingsError) {
//             return res.status(500).json({ message: bookingsError.message });
//           }
//
//           this.usersService.getFlightsByUserId(
//             userId,
//             (flightsError, flights) => {
//               if (flightsError) {
//                 return res.status(500).json({ message: flightsError.message });
//               }
//
//               // Respond with user, bookings, and flights data
//               return res.status(200).json({
//                 user,
//                 bookings,
//                 flights,
//               });
//             },
//           );
//         },
//       );
//     });
//   }
// }

// UsersController with Promises
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserData(@Param('id', ParseIntPipe) id: number) {
    return this.usersService
      .getUserById(id)
      .then((user: IUser) => {
        return this.usersService
          .getBookingsByUserId(id)
          .then((bookings: IBooking[]) => {
            return this.usersService
              .getFlightsByUserId(id)
              .then((flights: IFlight[]) => {
                return { user, bookings, flights };
              });
          });
      })
      .catch((error) => {
        if (
          error instanceof NotFoundException ||
          error instanceof InternalServerErrorException
        ) {
          throw error;
        }
        throw new Error('An unexpected error occurred');
      });
  }

  /*
  async/await version of my code
  */
  // async getUserByIdWithPromises(@Param('id') id: string) {
  //   const userId = Number(id);
  //   try {
  //     const user = await this.usersService.getUserById(userId);
  //     const bookings = await this.usersService.getBookingsByUserId(userId);
  //     const flights = await this.usersService.getFlightsByUserId(userId);
  //
  //     return { user, bookings, flights };
  //   } catch (error) {
  //     return { message: error.message };
  //   }
  // }
}
