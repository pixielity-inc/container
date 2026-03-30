import { Injectable, Inject } from "@abdokouta/react-di";
import { LoggerService } from "./logger.service";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: "2", name: "Bob Smith", email: "bob@example.com", role: "User" },
    { id: "3", name: "Charlie Brown", email: "charlie@example.com", role: "User" },
    { id: "4", name: "Diana Prince", email: "diana@example.com", role: "Moderator" },
  ];

  constructor(@Inject(LoggerService) private logger: LoggerService) {
    this.logger.info("UserService initialized");
  }

  getUsers(): User[] {
    this.logger.log("Fetching all users");
    return this.users;
  }

  getUserById(id: string): User | undefined {
    this.logger.log(`Fetching user with id: ${id}`);
    return this.users.find((user) => user.id === id);
  }

  addUser(user: User): void {
    this.logger.log(`Adding new user: ${user.name}`);
    this.users.push(user);
  }

  deleteUser(id: string): void {
    this.logger.log(`Deleting user with id: ${id}`);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
