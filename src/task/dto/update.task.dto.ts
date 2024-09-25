import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { StatusTask } from '../entity/task.entity';

export class UpdateTaskDto {
  @ApiProperty({ example: 'id', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({ required: false, example: 'title 1', type: String })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false, example: 'description 1', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false, example: new Date(), type: Date })
  @IsOptional()
  @IsString()
  deadline?: Date;

  @ApiProperty({
    required: false,
    example: StatusTask.COMPLETED,
    enum: StatusTask,
  })
  @IsOptional()
  @IsString()
  status?: StatusTask;
}
