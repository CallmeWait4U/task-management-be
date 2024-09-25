import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { SignUpDto } from './dto/sign.up.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/sign.in.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from './jwt.config';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject()
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const existedUser = await this.userRepository.findOneBy({
      username: signUpDto.username,
    });
    if (existedUser) {
      throw new HttpException('Username existed', HttpStatus.BAD_REQUEST);
    }
    if (signUpDto.password !== signUpDto.passwordConfirm) {
      throw new HttpException('Confirm password wrong', HttpStatus.BAD_REQUEST);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(signUpDto.password, salt);
    await this.userRepository.save({
      username: signUpDto.username,
      password: hashPassword,
      token: null,
    });
    return 'Sign up successfully';
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOneBy({
      username: signInDto.username,
    });
    if (!user) {
      throw new HttpException(
        'Wrong Username/Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const check = await bcrypt.compare(signInDto.password, user.password);
    if (check === false) {
      throw new HttpException(
        'Wrong username/Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = await this.jwtService.signAsync(
      { id: user.id, username: user.username },
      { secret: jwtConfig.access, expiresIn: jwtConfig.expiresIn.access },
    );
    await this.userRepository.save({ ...user, token });
    return { token };
  }

  async signOut(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    await this.userRepository.save({ ...user, token: null });
    return 'Sign out successfully';
  }

  async mockData() {
    for (let i = 1; i < 6; i++) {
      await this.signUp({
        username: 'username' + i,
        password: '123456',
        passwordConfirm: '123456',
      });
    }
  }
}
