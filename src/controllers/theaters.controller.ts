import { Controller, Get } from '@nestjs/common';
import { TheatersService } from 'src/services/theaters.service';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get('/')
  async getAllTheaters() {
    return await this.theatersService.getAllTheaters();
  }
}
