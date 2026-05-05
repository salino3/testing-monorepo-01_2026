import { Injectable } from '@nestjs/common';
import { User } from '@project/shared-types';

@Injectable()
export class UsersService {
  private users: User[] = [];
}
