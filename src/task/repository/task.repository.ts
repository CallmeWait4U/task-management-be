import { Inject, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { StatusTask, Task } from '../entity/task.entity';
import { User } from 'src/authentication/entity/user.entity';
import { CreateTaskCommand } from '../handler/command/create.task.command';
import { UpdateTaskCommand } from '../handler/command/update.task.command';
import { DeleteTaskCommand } from '../handler/command/delete.task.command';
import { GetAllTasksQuery } from '../handler/query/get.all.tasks.query';
import { SearchStatus } from '../dto/get.all.tasks.dto';
import { GetDetailTaskQuery } from '../handler/query/get.detail.task.query';

@Injectable()
export class TaskRepository {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async getByIdAndUser(id: string, user: User): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id, user });
    return task;
  }

  async getAll(
    data: GetAllTasksQuery,
  ): Promise<{ items: Task[]; total: number }> {
    let query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :id', { id: data.idUser });
    if (data.search) {
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where('task.title like :title', {
            title: `%${data.search}%`,
          }).orWhere('task.description like :description', {
            description: `%${data.search}%`,
          });
        }),
      );
    }

    if (data.status !== SearchStatus.ALL) {
      query = query.andWhere('status = :searchStatus', {
        searchStatus: data.status,
      });
    }

    if (data.chosenDate === 'deadline') {
      query = query.orderBy('task.deadline', 'ASC');
    } else {
      query = query.orderBy('task.createdDate', 'ASC');
    }

    const [items, total] = await Promise.all([
      query
        .skip((data.pageNumber - 1) * 6)
        .take(6)
        .select([
          'task.id',
          'task.title',
          'task.description',
          'task.createdDate',
          'task.deadline',
          'task.status',
        ])
        .getMany(),
      query.getCount(),
    ]);
    return { items, total };
  }

  async getDetail(data: GetDetailTaskQuery): Promise<Task> {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :idUser', { idUser: data.idUser })
      .andWhere('task.id = :id', { id: data.id })
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.createdDate',
        'task.deadline',
        'task.status',
      ])
      .getOne();
    return task;
  }

  async createTask(user: User, data: CreateTaskCommand): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idUser, ...created } = data;
    await this.taskRepository.save({
      ...created,
      createdDate: new Date(),
      status: StatusTask.INCOMPLETED,
      user,
    });
    return 'Create successfully';
  }

  async updateTask(data: UpdateTaskCommand): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { idUser, ...updated } = data;
    await this.taskRepository.save({ ...updated });
    return 'Update successfully';
  }

  async deleteTask(data: DeleteTaskCommand): Promise<string> {
    await this.taskRepository.delete({ id: data.id });
    return 'Delete successfully';
  }
}
