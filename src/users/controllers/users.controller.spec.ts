// npm run test -- ./src/users/controllers/users.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { IUser } from '../../interfaces/user.interface';
import { IBooking } from '../../interfaces/booking.interface';
import { IFlight } from '../../interfaces/flight.interface';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getUserById: jest.fn(),
            getBookingsByUserId: jest.fn(),
            getFlightsByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserData', () => {
    it('should return user data including bookings and flights', async () => {
      const mockUser: IUser = {
        created_at: undefined,
        updated_at: undefined,
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword',
        phone: '1234567890',
      };
      const mockBookings: IBooking[] = [
        {
          id: 1,
          user_id: 1,
          flight_id: 1,
          date: '2023-10-01',
          status: 'confirmed',
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

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockUser);
      jest
        .spyOn(service, 'getBookingsByUserId')
        .mockResolvedValue(mockBookings);
      jest.spyOn(service, 'getFlightsByUserId').mockResolvedValue(mockFlights);

      const result = await controller.getUserData(1);
      expect(result).toEqual({
        user: mockUser,
        bookings: mockBookings,
        flights: mockFlights,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      jest
        .spyOn(service, 'getUserById')
        .mockRejectedValue(new NotFoundException('User with ID 999 not found'));

      await expect(controller.getUserData(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
