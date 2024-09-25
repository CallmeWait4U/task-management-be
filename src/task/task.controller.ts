import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'util/getuser.decorator';
import { UpdateTaskDto } from './dto/update.task.dto';
import { GetAllTasksDto } from './dto/get.all.tasks.dto';
import { GetDetailTaskDto } from './dto/get.detail.task.dto';
import { DeleteTaskDto } from './dto/delete.task.dto';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
@ApiTags('task')
@ApiBearerAuth()
export class TaskController {
  @Inject()
  private readonly taskService: TaskService;

  @Get('all')
  async getAllTasks(
    @GetUser() user: { id: string; username: string },
    @Query() query: GetAllTasksDto,
  ) {
    return await this.taskService.getAllTasks(user.id, query);
  }

  @Get('detail')
  async getDetailTask(
    @GetUser() user: { id: string; username: string },
    @Query() query: GetDetailTaskDto,
  ) {
    return await this.taskService.getDetailTask(user.id, query);
  }

  @Post('create')
  async createTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: CreateTaskDto,
  ) {
    return await this.taskService.createTask(user.id, body);
  }

  @Post('update')
  async updateTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(user.id, body);
  }

  @Post('delete')
  async deleteTask(
    @GetUser() user: { id: string; username: string },
    @Body() body: DeleteTaskDto,
  ) {
    return await this.taskService.deleteTask(user.id, body);
  }

  @Post('mockdata')
  async mockdata() {
    return await this.taskService.mockData();
  }
}
