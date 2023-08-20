import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  password: string;
  email: string;
};
@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: 'johndoe123',
    },
    { id: 2, name: 'Alice', email: 'alice@email.com', password: 'alice123' },
  ];

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
