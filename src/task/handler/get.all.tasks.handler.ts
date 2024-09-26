import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllTasksQuery } from './query/get.all.tasks.query';
import { GetAllTasksResult, TaskItem } from '../result/get.all.tasks.result';
import { Inject } from '@nestjs/common';
import { TaskRepository } from '../repository/task.repository';
import { plainToClass } from 'class-transformer';

@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler
  implements IQueryHandler<GetAllTasksQuery, GetAllTasksResult>
{
  @Inject()
  private taskRepository: TaskRepository;

  async execute(query: GetAllTasksQuery): Promise<GetAllTasksResult> {
    const { items, total } = await this.taskRepository.getAll(query);
    return {
      data: items.map((i) => {
        return plainToClass(
          TaskItem,
          {
            ...i,
            createdDate:
              i.createdDate.toLocaleDateString('vi') +
              ' ' +
              i.createdDate.toLocaleTimeString('vi'),
            deadline:
              i.deadline.toLocaleDateString('vi') +
              ' ' +
              i.deadline.toLocaleTimeString('vi'),
          },
          { excludeExtraneousValues: true },
        );
      }),
      total,
    };
  }
}
