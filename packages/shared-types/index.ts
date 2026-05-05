export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

export interface CreateUserDto {
  email: string;
  username: string;
}
