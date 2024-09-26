import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/util/getuser.decorator';
import { UpdateTaskDto } from './dto/update.task.dto';
import { GetAllTasksDto } from './dto/get.all.tasks.dto';
import { GetDetailTaskDto } from './dto/get.detail.task.dto';
import { DeleteTaskDto } from './dto/delete.task.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllTasksQuery } from './handler/query/get.all.tasks.query';
import { GetDetailTaskQuery } from './handler/query/get.detail.task.query';
import { CreateTaskCommand } from './handler/command/create.task.command';
import { UpdateTaskCommand } from './handler/command/update.task.command';
import { DeleteTaskCommand } from './handler/command/delete.task.command';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
@ApiTags('task')
@ApiBearerAuth()
export class TaskController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('all')
  async getAllTasks(
    @GetUser() user: { id: string; username: string },
    @Query() query: GetAllTasksDto,
  ) {
    const q = new GetAllTasksQuery({ ...query, idUser: user.id });
    return await this.queryBus.execute(q);
  }

  @Get('detail')
  async getDetailTask(
    @GetUser() user: { id: string; username: string },
    @Query() query: GetDetailTaskDto,
  ) {
    const q = new GetDetailTaskQuery({ ...query, idUser: user.id });
    return await this.queryBus.execute(q);
  }

  @Post('create')
  async createTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: CreateTaskDto,
  ) {
    const command = new CreateTaskCommand({ ...body, idUser: user.id });
    return await this.commandBus.execute(command);
  }

  @Post('update')
  async updateTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: UpdateTaskDto,
  ) {
    const command = new UpdateTaskCommand({ ...body, idUser: user.id });
    return await this.commandBus.execute(command);
    // return await this.taskService.updateTask(user.id, body);
  }

  @Post('delete')
  async deleteTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: DeleteTaskDto,
  ) {
    const command = new DeleteTaskCommand({ ...body, idUser: user.id });
    return await this.commandBus.execute(command);
    // return await this.taskService.deleteTask(user.id, body);
  }

  @Post('mockdata')
  async mockdata() {
    // return await this.taskService.mockData();
  }
}
