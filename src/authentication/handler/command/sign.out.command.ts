import { ICommand } from '@nestjs/cqrs';

export class SignOutCommand implements ICommand {
  id: string;

  constructor(data: SignOutCommand) {
    Object.assign(this, data);
  }
}
