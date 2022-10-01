import { Module } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';

@Module({
  providers: [WithdrawService],
})
export class WithdrawModule {}
