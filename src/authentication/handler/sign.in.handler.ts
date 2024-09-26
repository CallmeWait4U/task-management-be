import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { jwtConfig } from '../jwt.config';
import * as bcrypt from 'bcrypt';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './command/sign.in.command';

@CommandHandler(SignInCommand)
export class SignInHandler
  implements ICommandHandler<SignInCommand, { token: string }>
{
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private userRepository: UserRepository;

  async execute(command: SignInCommand): Promise<{ token: string }> {
    const user = await this.userRepository.getByUsername(command.username);
    if (!user) {
      throw new HttpException(
        'Wrong Username/Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const check = await bcrypt.compare(command.password, user.password);
    if (check === false) {
      throw new HttpException(
        'Wrong username/Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync(
      { id: user.id, username: user.username },
      { secret: jwtConfig.access, expiresIn: jwtConfig.expiresIn.access },
    );
    await this.userRepository.updateUser({ ...user, token });
    return { token };
  }
}
