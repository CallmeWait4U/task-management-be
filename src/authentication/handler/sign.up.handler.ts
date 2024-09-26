import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import * as bcrypt from 'bcrypt';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './command/sign.up.command';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand, string> {
  @Inject()
  private userRepository: UserRepository;

  async execute(command: SignUpCommand): Promise<string> {
    const existedUser = await this.userRepository.getByUsername(
      command.username,
    );
    if (existedUser) {
      throw new HttpException('Username existed', HttpStatus.BAD_REQUEST);
    }
    if (command.password !== command.passwordConfirm) {
      throw new HttpException('Confirm password wrong', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(command.password, salt);
    await this.userRepository.createUser(command.username, hashPassword);
    return 'Sign up successfully';
  }
}
