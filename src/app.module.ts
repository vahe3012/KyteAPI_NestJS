// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
// import { PaymentsModule } from './payments/payments.module';

@Module({
  // imports: [UsersModule, BookingsModule, PaymentsModule], // Import new modules
  imports: [UsersModule, BookingsModule], // Import new modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
