import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(body: { name: string; lastName: string; email: string; password: string }) {
    const hashedPassword = bcrypt.hashSync(body.password, 10);
    return await this.userModel.create({ ...body, password: hashedPassword });
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ where: { email } });
  }
}
