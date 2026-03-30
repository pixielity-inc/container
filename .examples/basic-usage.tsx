/**
 * Basic Usage Example
 *
 * This example demonstrates the basic usage of @pixielity/container
 */

import React, { useEffect } from "react";
import {
  Module,
  Injectable,
  Inject,
  Inversiland,
  useInject,
} from "@pixielity/container";

// 1. Define services
@Injectable()
class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable()
class UserService {
  constructor(@Inject(Logger) private logger: Logger) {}

  getUsers() {
    this.logger.log("Fetching users...");
    return ["Alice", "Bob", "Charlie"];
  }
}

// 2. Create a module
@Module({
  providers: [Logger, UserService],
  exports: [UserService],
})
class UserModule {}

// 3. Create root module
@Module({
  imports: [UserModule],
})
class AppModule {}

// 4. Use in React components
function UserList() {
  const userService = useInject(UserService, AppModule);
  const users = userService.getUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </div>
  );
}

// 5. Initialize and render
export function App() {
  useEffect(() => {
    // Initialize Inversiland with configuration
    Inversiland.options.logLevel = "debug";
    Inversiland.options.defaultScope = "Singleton";

    // Run the root module
    Inversiland.run(AppModule);
  }, []);

  return <UserList />;
}
