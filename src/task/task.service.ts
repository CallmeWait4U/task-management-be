import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { StatusTask, Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { User } from 'src/authentication/entity/user.entity';
import { DeleteTaskDto } from './dto/delete.task.dto';
import { GetAllTasksDto, SearchStatus } from './dto/get.all.tasks.dto';
import { GetDetailTaskDto } from './dto/get.detail.task.dto';
import { faker } from '@faker-js/faker/locale/vi';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAllTasks(idUser: string, getAllTasks: GetAllTasksDto) {
    let query = this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :id', { id: idUser });
    if (getAllTasks.search) {
      query = query.andWhere(
        new Brackets((qb) => {
          qb.where('task.title like :title', {
            title: `%${getAllTasks.search}%`,
          }).orWhere('task.description like :description', {
            description: `%${getAllTasks.search}%`,
          });
        }),
      );
    }

    if (getAllTasks.status !== SearchStatus.ALL) {
      query = query.andWhere('status = :searchStatus', {
        searchStatus: getAllTasks.status,
      });
    }

    if (getAllTasks.chosenDate === 'deadline') {
      query = query.orderBy('task.deadline', 'ASC');
    } else {
      query = query.orderBy('task.createdDate', 'ASC');
    }

    const [data, total] = await Promise.all([
      query
        .skip((getAllTasks.pageNumber - 1) * 6)
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
    return {
      data: data.map((i) => {
        return {
          ...i,
          createdDate:
            i.createdDate.toLocaleDateString('vi') +
            ' ' +
            i.createdDate.toLocaleTimeString('vi'),
          deadline:
            i.deadline.toLocaleDateString('vi') +
            ' ' +
            i.deadline.toLocaleTimeString('vi'),
        };
      }),
      total,
    };
  }

  async getDetailTask(idUser: string, getDetailTask: GetDetailTaskDto) {
    const task = await this.taskRepository
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.user', 'user')
      .where('user.id = :idUser', { idUser })
      .andWhere('task.id = :id', { id: getDetailTask.id })
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

  async createTask(idUser: string, createTask: CreateTaskDto) {
    const user = await this.userRepository.findOneBy({ id: idUser });
    await this.taskRepository.save({
      ...createTask,
      createdDate: new Date(),
      status: StatusTask.INCOMPLETED,
      user,
    });
    return 'Create new task successfully';
  }

  async updateTask(idUser: string, updateTask: UpdateTaskDto) {
    const user = await this.userRepository.findOneBy({ id: idUser });
    const task = await this.taskRepository.findOneBy({
      id: updateTask.id,
      user,
    });
    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.BAD_REQUEST);
    }
    await this.taskRepository.save({ ...updateTask });
    return 'Update task successfully';
  }

  async deleteTask(idUser: string, deleteTask: DeleteTaskDto) {
    const user = await this.userRepository.findOneBy({ id: idUser });
    const task = await this.taskRepository.findOneBy({
      id: deleteTask.id,
      user,
    });
    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.BAD_REQUEST);
    }
    await this.taskRepository.delete({ id: deleteTask.id });
    return 'Delete task successfully';
  }

  async mockData() {
    const users = await this.userRepository.find({ select: { id: true } });
    for (const user of users) {
      const num = faker.number.int({ min: 16, max: 23 });
      for (let i = 0; i < num; i++) {
        await this.createTask(user.id, {
          title: faker.lorem.sentence({ min: 4, max: 7 }),
          description: faker.lorem.paragraph({ min: 2, max: 4 }),
          deadline: faker.date.soon({ days: 10 }),
        });
      }
    }
  }
}
