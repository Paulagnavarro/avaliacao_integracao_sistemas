import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User';
import { Message } from './models/Message';
import { AuthController } from './auth_service/auth.controller';  
import { MessageController } from './message_server/message.controller';
import { RecordController } from './record_service/record.controller';
import { UserController } from './user_service/user.controller';
import { AuthService } from './auth_service/auth.service';
import { MessageService } from './message_server/message.service';
import { QueueService } from './queue/queue.service';
import { RecordService } from './record_service/record.service';
import { UserService } from './user_service/user.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'positivo',
      database: 'generaldbs',
      models: [User,  Message],
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController, MessageController, RecordController, UserController],
  providers: [AuthService, MessageService, QueueService, RecordService, UserService],
})
export class AppModule {}
