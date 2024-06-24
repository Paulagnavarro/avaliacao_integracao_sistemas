import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from 'src/models/Message';

@Injectable()
export class RecordService {
  constructor(
    @InjectModel(Message)
    private messageModel: typeof Message
  ) {}

  async saveMessage(body: { message: string; userIdSend: string; userIdReceive: string }) {
    await this.messageModel.create(body);
  }

  async getMessagesForUser(userId: string) {
    return await this.messageModel.findAll({ where: { userIdReceive: userId } });
  }
}
