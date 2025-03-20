import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, 
  ) {}

  // Yeni kullanıcı kaydı oluşturma
  async createUser(username: string, password: string, role: UserRole = UserRole.USER): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, password: hashedPassword, role });
    return await this.userRepository.save(newUser);
  }

  // Kullanıcıyı username ile bulma
  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
  
  // Tüm kullanıcıları listeleme
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } }) || null;
  }

}