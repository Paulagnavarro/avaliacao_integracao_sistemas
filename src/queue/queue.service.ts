import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private queue: { [key: string]: string[] } = {};

  async sendMessageToQueue(queue: string, message: string) {
    if (!this.queue[queue]) {
      this.queue[queue] = [];
    }
    this.queue[queue].push(message);
  }

  async getMessagesFromQueue(queue: string): Promise<string[]> {
    const messages = this.queue[queue] || [];
    this.queue[queue] = [];
    return messages;
  }
}
