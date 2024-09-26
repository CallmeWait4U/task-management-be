import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTaskCommand } from './command/delete.task.command';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserRepository } from 'src/authentication/repository/user.repository';
import { TaskRepository } from '../repository/task.repository';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler
  implements ICommandHandler<DeleteTaskCommand, string>
{
  @Inject()
  private userRepository: UserRepository;
  @Inject()
  private taskRepository: TaskRepository;

  async execute(command: DeleteTaskCommand): Promise<string> {
    const user = await this.userRepository.getById(command.idUser);
    const task = await this.taskRepository.getByIdAndUser(command.id, user);
    if (!task) {
      throw new HttpException('Task does not exist', HttpStatus.BAD_REQUEST);
    }
    await this.taskRepository.deleteTask(command);
    return 'Update task successfully';
  }
}
