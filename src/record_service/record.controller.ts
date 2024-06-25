import { Controller, Post, Body } from '@nestjs/common';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  // Este método recebe os dados da mensagem no corpo da solicitação e os repassa para o serviço
  // RecordService para salvar a mensagem. Após a conclusão da operação, ele retorna { ok: true } 
  //para indicar que a operação foi bem-sucedida
  @Post('message')
  async saveMessage(@Body() body: { message: string; userIdSend: string; userIdReceive: string }) {
    await this.recordService.saveMessage(body);
    return { ok: true };
  }
}
