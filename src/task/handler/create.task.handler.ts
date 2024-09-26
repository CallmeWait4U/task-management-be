import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './command/create.task.command';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { TaskRepository } from '../repository/task.repository';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler
  implements ICommandHandler<CreateTaskCommand, string>
{
  @Inject()
  private userRepository: UserRepository;
  @Inject()
  private taskRepository: TaskRepository;

  async execute(command: CreateTaskCommand): Promise<string> {
    const user = await this.userRepository.getById(command.idUser);
    await this.taskRepository.createTask(user, command);
    return 'Create new task successfully';
  }
}
