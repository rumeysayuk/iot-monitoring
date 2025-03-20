import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    SYSTEM_ADMIN = 'system_admin',  // God Mode
    COMPANY_ADMIN = 'company_admin',
    USER = 'user',
  }

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; 

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, // Varsayılan rol 'user' olacak
  })
  role: UserRole;
}
