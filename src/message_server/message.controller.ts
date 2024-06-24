import { Controller, Post, Get, Body, Query, Headers } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthController } from '../auth_service/auth.controller';
import { AuthService } from '../auth_service/auth.service';
import { QueueService } from '../queue/queue.service';
import { RecordService } from '../record_service/record.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly authController: AuthController,
    private readonly authService: AuthService,
    private readonly queueService: QueueService,
    private readonly recordService: RecordService
  ) {}

  // Enviar Mensagem: Autentica o usuário, envia uma mensagem para a fila e processa a mensagem.
  @Post()
  async sendMessage(@Headers('Authorization') token: string, @Body() body: { userIdSend: string; userIdReceive: string; message: string }) {
    const authResponse = await this.authController.checkToken(token, body.userIdSend);
    if (!authResponse.auth) {
      return { msg: 'not auth' };
    }

    await this.queueService.sendMessageToQueue(`${body.userIdSend}${body.userIdReceive}`, body.message);
    await this.messageService.processMessages(body.userIdSend, body.userIdReceive, body.message);

    return { message: 'message sent with success' };
  }

  // Processar Mensagens: Autentica o usuário e processa mensagens de uma fila específica.
  @Post('worker')
  async processMessages(@Headers('Authorization') token: string, @Body() body: { userIdSend: string; userIdReceive: string }) {
    const authResponse = await this.authController.checkToken(token, body.userIdSend);
    if (!authResponse.auth) {
      return { msg: 'not auth' };
    }

    await this.messageService.processMessagesFromQueue(`${body.userIdSend}${body.userIdReceive}`);
    return { msg: 'ok' };
  }

  // Recuperar Mensagens (getMessages): Autentica o usuário e retorna as mensagens armazenadas para ele.
  @Get()
  async getMessages(@Headers('Authorization') token: string, @Query('user') userId: string) {
    const authResponse = await this.authController.checkToken(token, userId);
    if (!authResponse.auth) {
      return { msg: 'not auth' };
    }

    const messages = await this.recordService.getMessagesForUser(userId);
    return messages;
  }
}
