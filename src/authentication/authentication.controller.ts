import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign.up.dto';
import { AuthenticationService } from './authentication.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign.in.dto';
import { GetUser } from 'util/getuser.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
@ApiTags('authentication')
export class AuthenticationController {
  @Inject()
  private readonly authenticationService: AuthenticationService;

  @Post('sign-up')
  async signUp(@Body() body: SignUpDto) {
    return await this.authenticationService.signUp(body);
  }

  @Post('sign-in')
  async signIn(@Body() body: SignInDto) {
    return await this.authenticationService.signIn(body);
  }

  @Post('sign-out')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async signOut(@GetUser() user: { id: string; username: string }) {
    return await this.authenticationService.signOut(user.id);
  }

  @Post('mockdata')
  async mockdata() {
    return await this.authenticationService.mockData();
  }
}
