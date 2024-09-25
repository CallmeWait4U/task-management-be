import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteTaskDto {
  @ApiProperty({ example: 'id', type: String })
  @IsNotEmpty()
  @IsString()
  id: string;
}
