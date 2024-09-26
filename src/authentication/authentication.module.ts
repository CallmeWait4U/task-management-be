import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { AuthenticationStrategy } from './authentication.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { userProvides } from './entity/user.provides';
import { AuthenticationController } from './authentication.controller';
import { UserRepository } from './repository/user.repository';
import { SignInHandler } from './handler/sign.in.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { SignUpHandler } from './handler/sign.up.handler';
import { SignOutHandler } from './handler/sign.out.handler';

const handler = [SignUpHandler, SignInHandler, SignOutHandler];

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig.access,
      signOptions: { expiresIn: jwtConfig.expiresIn.access },
    }),
    CqrsModule,
  ],
  providers: [
    AuthenticationStrategy,
    UserRepository,
    ...userProvides,
    ...handler,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
