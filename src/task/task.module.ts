import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { taskProvides } from './entity/task.provides';
import { TaskController } from './task.controller';
import { userProvides } from 'src/authentication/entity/user.provides';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { GetAllTasksHandler } from './handler/get.all.tasks.handler';
import { GetDetailTaskHandler } from './handler/get.detail.task.handler';
import { CreateTaskHandler } from './handler/create.task.handler';
import { UpdateTaskHandler } from './handler/update.task.handler';
import { DeleteTaskCommand } from './handler/command/delete.task.command';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskRepository } from './repository/task.repository';

const handler = [
  GetAllTasksHandler,
  GetDetailTaskHandler,
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskCommand,
];

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    ...taskProvides,
    ...userProvides,
    TaskRepository,
    UserRepository,
    ...handler,
  ],
  controllers: [TaskController],
})
export class TaskModule {}
