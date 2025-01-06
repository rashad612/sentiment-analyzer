import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  health(): string {
    return 'API is up and running!';
  }
}
