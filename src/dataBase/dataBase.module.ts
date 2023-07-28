import { Module } from '@nestjs/common';
import { DataBaseService } from './dataBase.service';

@Module({
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
