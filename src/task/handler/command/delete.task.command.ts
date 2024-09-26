import { ICommand } from '@nestjs/cqrs';

export class DeleteTaskCommand implements ICommand {
  idUser: string;
  id: string;

  constructor(data: DeleteTaskCommand) {
    Object.assign(this, data);
  }
}
