import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Sensor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sensor_id: string;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;

  @CreateDateColumn()
  timestamp: Date;
}
