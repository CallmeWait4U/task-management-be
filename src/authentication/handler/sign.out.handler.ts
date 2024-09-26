import { Inject } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { SignOutCommand } from './command/sign.out.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand, string> {
  @Inject()
  private userRepository: UserRepository;

  async execute(command: SignOutCommand): Promise<string> {
    const user = await this.userRepository.getById(command.id);
    await this.userRepository.updateUser({ ...user, token: null });
    return 'Sign out successfully';
  }
}
