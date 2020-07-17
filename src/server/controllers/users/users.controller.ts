import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import { User } from 'schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }
}
