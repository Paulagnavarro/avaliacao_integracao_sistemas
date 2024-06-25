import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private queue: { [key: string]: string[] } = {};

  // adiciona uma mensagem a uma fila especificada
  async sendMessageToQueue(queue: string, message: string) {
    if (!this.queue[queue]) {
      this.queue[queue] = [];
    }
    this.queue[queue].push(message);
  }

  // recupera todas as mensagens de uma fila especificada e limpa a fila depois disso
  async getMessagesFromQueue(queue: string): Promise<string[]> {
    const messages = this.queue[queue] || [];
    this.queue[queue] = [];
    return messages;
  }
}
