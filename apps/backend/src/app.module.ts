import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'app',
    password: 'abcd0123',
    database: 'team',
    autoLoadEntities: true,
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
