import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      username,
    });
    return user;
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({
      id,
    });
    return user;
  }

  async createUser(username: string, password: string): Promise<string> {
    await this.userRepository.save({
      username: username,
      password: password,
      token: null,
    });
    return 'Create successfully';
  }

  async updateUser(user: User): Promise<string> {
    await this.userRepository.save({ ...user });
    return 'Update successfully';
  }
}
