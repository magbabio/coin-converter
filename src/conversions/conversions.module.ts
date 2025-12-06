import { Module } from '@nestjs/common';
import { ConversionsService } from './conversions.service';
import { ConversionsController } from './conversions.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ConversionsController],
  providers: [ConversionsService],
  exports: [ConversionsService],
})
export class ConversionsModule {}
