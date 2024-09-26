import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
// import { AuthenticationService } from './authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign.in.dto';
import { GetUser } from 'src/util/getuser.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from './handler/command/sign.up.command';
import { SignOutCommand } from './handler/command/sign.out.command';
import { SignInCommand } from './handler/command/sign.in.command';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  constructor(
    private commandBus: CommandBus,
    // private queryBus: QueryBus,
  ) {}

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    const command = new SignUpCommand(body);
    return await this.commandBus.execute(command);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    const command = new SignInCommand(body);
    return await this.commandBus.execute(command);
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signOut(@GetUser() user: { id: string; username: string }) {
    const command = new SignOutCommand({ id: user.id });
    return await this.commandBus.execute(command);
  }

  @Post('mockdata')
  async mockdata() {
    // return await this.authenticationService.mockData();
  }
}
