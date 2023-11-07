import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { PasswordLink } from './models/passwordlink.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PasswordLink])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
