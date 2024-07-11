import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET || 'CHANGETHIS',
    signOptions: { expiresIn: '24h' },
  }),],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
