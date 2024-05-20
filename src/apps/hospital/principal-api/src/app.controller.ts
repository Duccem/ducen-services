import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Controller('api')
export class AppController {
  constructor(private client: PrismaClient) {}

  @Get('')
  async health(): Promise<any> {
    return await this.client['user'].findMany();
  }
}
