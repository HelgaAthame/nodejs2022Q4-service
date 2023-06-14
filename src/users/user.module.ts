import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DataBaseModule } from 'src/dataBase/dataBase.module';

@Module({
  imports: [DataBaseModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
