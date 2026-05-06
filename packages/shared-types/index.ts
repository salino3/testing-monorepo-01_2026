export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

// Data Transfer Object
export interface CreateUserDto {
  email: string;
  username: string;
}
