import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sensor } from './sensor.entity';

@Injectable()
export class SensorService implements OnModuleInit {
  private client: mqtt.MqttClient;
  private sensorIds = ['temp_sensor_01', 'temp_sensor_02', 'temp_sensor_03']; // 3 sensör

  constructor(
    @InjectRepository(Sensor)
    private sensorRepository: Repository<Sensor>,
  ) {}

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      this.startSensorSimulation();
    });
  }

  startSensorSimulation() {
    setInterval(() => {
      const sensorId = this.sensorIds[Math.floor(Math.random() * this.sensorIds.length)];
      const data = {
        sensor_id: sensorId,
        timestamp: new Date(),
        temperature: parseFloat((Math.random() * 10 + 20).toFixed(2)), // 20-30°C arası
        humidity: parseFloat((Math.random() * 20 + 40).toFixed(2)), // 40-60% arası
      };

      this.client.publish('sensor/data', JSON.stringify(data));
      console.log('Sent:', data);
    }, 60000); // 60 saniyede bir veri yolla
  }

  async saveSensorData(sensorData: Sensor) {
    return this.sensorRepository.save(sensorData);
  }
}
