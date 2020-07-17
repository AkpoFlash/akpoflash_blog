import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly usersCollection: Model<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersCollection.find().exec();
  }
}
