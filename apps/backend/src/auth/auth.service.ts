import bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Wrong credentialss');
    }

    const payload = { ID: user.ID, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
