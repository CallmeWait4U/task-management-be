import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTaskCommand } from './command/update.task.command';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { TaskRepository } from '../repository/task.repository';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler
  implements ICommandHandler<UpdateTaskCommand, string>
{
  @Inject()
  private userRepository: UserRepository;
  @Inject()
  private taskRepository: TaskRepository;

  async execute(command: UpdateTaskCommand): Promise<string> {
    const user = await this.userRepository.getById(command.idUser);
    const task = await this.taskRepository.getByIdAndUser(command.id, user);
    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.BAD_REQUEST);
    }
    await this.taskRepository.updateTask(command);
    return 'Update task successfully';
  }
}
