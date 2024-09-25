import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';
import { AuthenticationStrategy } from './authentication.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { userProvides } from './entity/user.provides';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConfig.access,
      signOptions: { expiresIn: jwtConfig.expiresIn.access },
    }),
  ],
  providers: [AuthenticationStrategy, AuthenticationService, ...userProvides],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
