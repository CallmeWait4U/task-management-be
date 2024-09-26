import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { StatusTask } from '../entity/task.entity';

export class TaskItem {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  createdDate: string;

  @Expose()
  deadline: string;

  @Expose()
  status: StatusTask;
}

export class GetAllTasksResult implements IQueryResult {
  @Expose()
  data: TaskItem[];

  @Expose()
  total: number;
}
