
// npm run test -- ./src/users/services/users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { readFile } from '../../utils/file.utils';
import { IUser } from '../../interfaces/user.interface'; // Import IUser interface
import { IBooking } from '../../interfaces/booking.interface'; // Import IBooking interface
import { IFlight } from '../../interfaces/flight.interface'; //

jest.mock('../../utils/file.utils');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserById', () => {
    it('should return a user when found', async () => {
      const mockUser: IUser = {
        created_at: undefined,
        email: '',
        password: '',
        updated_at: undefined,
        id: 1,
        name: 'John Doe',
      };
      (readFile as jest.Mock).mockResolvedValue([mockUser]);
      const user: IUser = await service.getUserById(1);
      expect(user).toEqual(mockUser);
    });

    it('should throw an error when user is not found', async () => {
      (readFile as jest.Mock).mockResolvedValueOnce([]);
      await expect(service.getUserById(999)).rejects.toThrow(
        'User with ID 999 not found',
      );
    });
  });

  describe('getBookingsByUserId', () => {
    it('should return bookings of the the user when found', async () => {
      const mockBookings: IBooking[] = [
        {
          user_id: 1,
          flight_id: 1,
          id: 0,
          date: '',
          status: '',
        },
      ];
      (readFile as jest.Mock).mockResolvedValueOnce(mockBookings);

      const bookings = await service.getBookingsByUserId(1);
      expect(bookings).toEqual(mockBookings);
    });

    it('should throw an error when no bookings are found for the user', async () => {
      (readFile as jest.Mock).mockResolvedValueOnce([]);
      await expect(service.getBookingsByUserId(999)).rejects.toThrow(
        'No bookings found for user with ID 999',
      );
    });
  });
  describe('getFlightsByUserId', () => {
    it('should return flights for the user when found', async () => {
      const mockBookings: IBooking[] = [
        {
          user_id: 1,
          flight_id: 1,
          id: 0,
          date: '',
          status: '',
        },
      ];
      const mockFlights: IFlight[] = [
        {
          id: 1,
          flight_number: 'AB123',
          departure_airport: 'JFK',
          arrival_airport: 'LAX',
          departure_time: '2023-10-01T12:00:00Z',
          arrival_time: '2023-10-01T15:00:00Z',
          price: 300,
        },
      ];

      (readFile as jest.Mock)
        .mockResolvedValueOnce(mockBookings)
        .mockResolvedValueOnce(mockFlights);

      const flights = await service.getFlightsByUserId(1);
      expect(flights).toEqual(mockFlights);
    });

    it('should throw an error when no flights are found for the user', async () => {
      (readFile as jest.Mock)
        .mockResolvedValueOnce([{ user_id: 1000, flight_id: 1 }])
        .mockResolvedValueOnce([]);

      await expect(service.getFlightsByUserId(1000)).rejects.toThrow(
        'No flights found for user with ID 1000',
      );
    });
  });
});
