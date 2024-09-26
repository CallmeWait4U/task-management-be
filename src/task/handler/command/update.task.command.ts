import { ICommand } from '@nestjs/cqrs';
import { StatusTask } from 'src/task/entity/task.entity';

export class UpdateTaskCommand implements ICommand {
  idUser: string;
  id: string;
  title?: string;
  description?: string;
  deadline?: Date;
  status?: StatusTask;

  constructor(data: UpdateTaskCommand) {
    Object.assign(this, data);
  }
}
