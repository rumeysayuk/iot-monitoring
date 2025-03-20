import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';
import { SensorGateway } from '../sensor/sensor.gateway';
import { SensorService } from '../sensor/sensor.service';
import { Sensor } from '../sensor/sensor.entity';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: mqtt.MqttClient;

  constructor(
    private readonly sensorGateway: SensorGateway,
    private readonly sensorService: SensorService,
  ) {}

  onModuleInit() {
    this.client = mqtt.connect('mqtt://localhost:1883');

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      this.client.subscribe('sensor/data');
    });

    this.client.on('message', async (topic, message) => {
      if (topic === 'sensor/data') {
        const data = JSON.parse(message.toString());
        console.log('Received Sensor Data:', data);

        // WebSocket üzerinden client'lara gönder
        this.sensorGateway.sendMessage(data);

        // Veritabanına kaydet
        const sensorRecord = new Sensor();
        sensorRecord.sensor_id = data.sensor_id;
        sensorRecord.temperature = data.temperature;
        sensorRecord.humidity = data.humidity;
        sensorRecord.timestamp = new Date();

        await this.sensorService.saveSensorData(sensorRecord);
      }
    });
  }
}
