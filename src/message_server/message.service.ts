import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from 'src/models/Message';
import { QueueService } from '../queue/queue.service';
import { RecordService } from '../record_service/record.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message,
    private readonly queueService: QueueService,
    private readonly recordService: RecordService
  ) {}

  async sendMessage(userIdSend: string, userIdReceive: string, message: string) {
    await this.messageModel.create({ userIdSend, userIdReceive, message });
  }

  async processMessagesFromQueue(queue: string) {
    const messages = await this.queueService.getMessagesFromQueue(queue);
    for (const message of messages) {
      await this.recordService.saveMessage(message);
    }
  }
}