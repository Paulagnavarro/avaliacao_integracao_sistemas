import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/User';
<<<<<<< HEAD
import { Message } from './models/Message';
=======
import { AppUserController } from './app.usercontroller';
>>>>>>> f18315860bdc3c6781c703c9c75bfea574302825

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
  controllers: [AppController, AppUserController],
  providers: [AppService],
})
export class AppModule {}
