import { Controller, Get, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './sensor.entity';

@Controller('sensors')
export class SensorController {
  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  @Get(':sensor_id')
  async getSensorData(@Param('sensor_id') sensor_id: string) {
    return this.sensorRepository.find({
      where: { sensor_id },
      order: { timestamp: 'DESC' }, // En son veriyi en üste getir
      take: 10, // Son 10 veriyi getir
    });
  }
}
