import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './models/user.entity';
import { PasswordLink } from './models/passwordlink.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(PasswordLink)
    private passwordRepo: Repository<PasswordLink>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(email: string, password: string) {
    const salt = await bcrypt.genSalt();
    return this.userRepo.insert({
      email,
      salt,
      password: await bcrypt.hash(password, salt),
    });
  }

  async generateForgotPasswordCode(user: User) {
    const hash = crypto.randomBytes(20).toString('hex');

    const code = await this.passwordRepo.findOne({
      where: {
        user,
      },
    });

    if (code) {
      this.passwordRepo.delete(code);
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await this.passwordRepo.save({
      user,
      code: hash,
      expiresAt,
    });

    return hash;
  }

  async findByPasswordLink(hash: string): Promise<User | undefined> {
    const passwordLink = await this.passwordRepo.findOne({
      where: {
        code: hash,
        expiresAt: MoreThan(new Date()),
      },
      relations: ['user'],
    });
    return passwordLink?.user;
  }

  async changePassword(user: User, newPassword: string) {
    return this.userRepo.save({
      ...user,
      password: await bcrypt.hash(newPassword, user.salt),
    });
  }
}
