import { ICommand } from '@nestjs/cqrs';

export class SignInCommand implements ICommand {
  username: string;
  password: string;

  constructor(data: SignInCommand) {
    Object.assign(this, data);
  }
}
