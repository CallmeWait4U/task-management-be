import { IQuery } from '@nestjs/cqrs';
import { ChosenDate, SearchStatus } from 'src/task/dto/get.all.tasks.dto';

export class GetAllTasksQuery implements IQuery {
  idUser: string;
  search?: string;
  status: SearchStatus;
  chosenDate: ChosenDate;
  pageNumber: number;

  constructor(data: GetAllTasksQuery) {
    Object.assign(this, data);
  }
}
