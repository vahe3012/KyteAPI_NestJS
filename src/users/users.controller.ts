import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
// import { Response } from 'express';

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
  async getUserByIdWithPromises(@Param('id') id: string) {
    const userId = Number(id);
    try {
      const user = await this.usersService.getUserById(userId);
      const bookings = await this.usersService.getBookingsByUserId(userId);
      const flights = await this.usersService.getFlightsByUserId(userId);

      return { user, bookings, flights };
    } catch (error) {
      return { message: error.message };
    }
  }
}
