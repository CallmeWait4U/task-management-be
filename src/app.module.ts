import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [AuthenticationModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
