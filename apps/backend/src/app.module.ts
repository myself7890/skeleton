import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from 'config/orm.config';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot(configOrm)],
  controllers: [],
  providers: [],
})
export class AppModule {}
