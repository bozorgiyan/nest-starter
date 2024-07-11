import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule, forwardRef(()=> AuthModule)],
  providers: [UsersService, ...UsersProviders],
  exports: [UsersService]
})
export class UsersModule {}
