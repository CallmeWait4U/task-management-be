import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SearchStatus {
  ALL = 'all',
  COMPLETED = 'completed',
  INCOMPLETED = 'incompleted',
}

export enum ChosenDate {
  CREATEDDATE = 'createdDate',
  DEADLINE = 'deadline',
}

export class GetAllTasksDto {
  @ApiProperty({ required: false, example: 'a', type: String })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ example: SearchStatus.ALL, enum: SearchStatus })
  @IsNotEmpty()
  @IsString()
  status: SearchStatus;

  @ApiProperty({ example: ChosenDate.CREATEDDATE, enum: ChosenDate })
  @IsNotEmpty()
  @IsString()
  chosenDate: ChosenDate;

  @ApiProperty({ example: 1, type: Number })
  @IsNotEmpty()
  // @IsNumber()
  pageNumber: number;
}
