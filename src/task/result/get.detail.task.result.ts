import { IQueryResult } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { StatusTask } from '../entity/task.entity';

export class GetDetailTaskResult implements IQueryResult {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  deadline: Date;

  @Expose()
  status: StatusTask;
}
