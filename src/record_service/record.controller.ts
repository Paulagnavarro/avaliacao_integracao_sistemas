import { Controller, Post, Body } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('message')
  async saveMessage(@Body() body: { message: string; userIdSend: string; userIdReceive: string }) {
    await this.recordService.saveMessage(body);
    return { ok: true };
  }
}
