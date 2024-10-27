import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  @Get('/')
  getHome(@Res() res: Response): void {
    // Update the path to serve 'home.html' from 'Kyte' directory
    const filePath = join(process.cwd(), 'public', 'Kyte', 'home.html');
    res.sendFile(filePath);
  }
}
