import { Task } from 'src/task/entity/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  token!: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
