import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { taskProvides } from './entity/task.provides';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { userProvides } from 'src/authentication/entity/user.provides';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProvides, ...userProvides, TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
