import { ICommand } from '@nestjs/cqrs';

export class CreateTaskCommand implements ICommand {
  idUser: string;
  title: string;
  description: string;
  deadline: Date;

  constructor(data: CreateTaskCommand) {
    Object.assign(this, data);
  }
}
