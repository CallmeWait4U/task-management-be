import { User } from 'src/authentication/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum StatusTask {
  COMPLETED = 'completed',
  INCOMPLETED = 'incompleted',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('datetime')
  createdDate: Date;

  @Column('datetime')
  deadline: Date;

  @Column({
    type: 'enum',
    enum: StatusTask,
  })
  status: StatusTask;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
