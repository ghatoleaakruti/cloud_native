import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  async checkHealth(): Promise<{ status: string }> {
    const isDatabaseHealthy = await this.healthService.checkDatabase();

    if (!isDatabaseHealthy) {
      throw new HttpException(
        { status: 'unhealthy', message: 'Database connection failed' },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return { status: 'healthy' };
  }
}