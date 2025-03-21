import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity'; // Kullanıcıyı ilişkilendiriyoruz

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;  // Log'u kimin yaptığı

  @Column()
  action: string;  // Log işlemi

  @Column()
  timestamp: number;  // Zaman damgası (Unix timestamp)

  @Column('json', { nullable: true })
  details: Record<string, any> | null;  // Hatalı veri ya da detaylar
}