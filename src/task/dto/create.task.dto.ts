import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'title', type: String })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'description', type: String })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: new Date(), type: Date })
  @IsNotEmpty()
  @IsString()
  deadline: Date;
}
