import { Controller, UseGuards, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  getHello() {
    return this.appService.getHello();
  }
}
