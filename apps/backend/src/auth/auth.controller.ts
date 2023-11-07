import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MailerService } from 'mailer/mailer.service';
import { User } from 'users/models/user.entity';
import { UsersService } from 'users/users.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

interface UserRequest {
  user: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() login: LoginDto) {
    return this.authService.signIn(login.email, login.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signup(@Body() signup: SignupDto) {
    const user = await this.usersService.findOne(signup.email);
    if (user) {
      throw new BadRequestException(
        `User with email ${signup.email} already exists`,
      );
    }
    await this.usersService.create(signup.email, signup.password);
    return this.authService.signIn(signup.email, signup.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgotpassword')
  async forgotPassword(@Body() forgotPassword: ForgotPasswordDto) {
    const user = await this.usersService.findOne(forgotPassword.email);
    if (!user) {
      throw new BadRequestException(
        `User with email ${forgotPassword.email} does not exist`,
      );
    }

    const hash = await this.usersService.generateForgotPasswordCode(user);

    await this.mailerService.sendMail(
      forgotPassword.email,
      'Forgot password',
      `<a href="http://localhost:3000/changepassword/${hash}">Cliquez ici</a>`,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('forgotpassword/validate/:hash')
  async validateForgotPasswordHash(@Param('hash') hash: string) {
    const user = await this.usersService.findByPasswordLink(hash);
    if (!user) {
      throw new BadRequestException('Link is invalid or expired');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Put('changepassword')
  async changePassword(@Body() changePassword: ChangePasswordDto) {
    const user = await this.usersService.findByPasswordLink(
      changePassword.hash,
    );
    if (!user) {
      throw new BadRequestException('Link is invalid or expired');
    }

    this.usersService.changePassword(user, changePassword.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: UserRequest): Pick<User, 'email'> {
    return {
      email: req.user.email,
    };
  }
}
