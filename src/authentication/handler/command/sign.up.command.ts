import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {
  username: string;
  password: string;
  passwordConfirm: string;

  constructor(data: SignUpCommand) {
    Object.assign(this, data);
  }
}
