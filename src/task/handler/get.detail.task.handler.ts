import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDetailTaskQuery } from './query/get.detail.task.query';
import { GetDetailTaskResult } from '../result/get.detail.task.result';
import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetDetailTaskQuery)
export class GetDetailTaskHandler
  implements IQueryHandler<GetDetailTaskQuery, GetDetailTaskResult>
{
  @Inject()
  private taskRepository: TaskRepository;

  async execute(query: GetDetailTaskQuery): Promise<GetDetailTaskResult> {
    const task = await this.taskRepository.getDetail(query);
    return plainToClass(GetDetailTaskResult, task, {
      excludeExtraneousValues: true,
    });
  }
}
