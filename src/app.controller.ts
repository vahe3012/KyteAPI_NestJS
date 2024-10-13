// src/app.controller.ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller()
export class AppController {
  @Get('/')
  getHome(@Res() res: Response): void {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  }
}
