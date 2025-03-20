import { Module,MiddlewareConsumer,NestModule } from '@nestjs/common';
import { RateLimitingMiddleware } from './middlewares/rate-limiting.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module'; // user module
import { AuthModule } from './auth/auth.module'; // auth module
import { MqttService } from './mqtt/mqtt.service';
import { SensorGateway } from './sensor/sensor.gateway';
import { SensorService } from './sensor/sensor.service';
import { RolesGuard } from './auth/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { SensorController } from './sensor/sensor.controller';
import { Sensor } from './sensor/sensor.entity';
import { Log } from './logs/log.entity';
import { LogService } from './logs/log.service';
import { LogController } from './logs/log.controller';
import { LogModule } from './logs/logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Docker config
      password: '', // Docker config
      database: 'postgres', // Docker config
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Dev ortamında otomatik DB güncellemeleri
    }),
    TypeOrmModule.forFeature([Sensor]),
    TypeOrmModule.forFeature([Log]),
    UserModule,
    AuthModule,
    LogModule
    
  ],
  providers: [MqttService, SensorGateway, SensorService,LogService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  },],
  controllers: [SensorController,LogController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitingMiddleware).forRoutes('*'); // Tüm routelere uygula
  }
}