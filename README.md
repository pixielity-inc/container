# @pixielity/container

Dependency injection container for React with NestJS-style modules. Built on top of [Inversiland](https://github.com/inversiland/inversiland) to provide powerful, type-safe dependency injection for React applications.

## Features

- 🎯 NestJS-style module system for React
- 💉 Powerful dependency injection with decorators
- 🔄 Dynamic modules with `forRoot` and `forFeature` patterns
- ⚛️ React hooks for accessing dependencies
- 📦 Hierarchical module structure
- 🎨 TypeScript-first with full type safety

## Installation

```bash
npm install @pixielity/container
# or
yarn add @pixielity/container
# or
pnpm add @pixielity/container
```

## Quick Start

### 1. Define Services

```typescript
import { Injectable, Inject } from "@pixielity/container";

@Injectable()
export class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable()
export class UserService {
  constructor(@Inject(Logger) private logger: Logger) {}

  getUsers() {
    this.logger.log("Fetching users...");
    return ["Alice", "Bob"];
  }
}
```

### 2. Create a Module

```typescript
import { Module } from "@pixielity/container";
import { UserService } from "./user.service";
import { Logger } from "./logger.service";

@Module({
  providers: [UserService, Logger],
  exports: [UserService],
})
export class UserModule {}
```

### 3. Create Root Module

```typescript
import { Module } from "@pixielity/container";
import { UserModule } from "./user/user.module";

@Module({
  imports: [UserModule],
})
export class AppModule {}
```

### 4. Use ContainerProvider (React - Recommended)

```typescript
// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContainerProvider } from "@pixielity/container";
import { AppModule } from "./app.module";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContainerProvider module={AppModule}>
      <App />
    </ContainerProvider>
  </StrictMode>
);
```

**What ContainerProvider does:**
- Automatically calls `Inversiland.run(AppModule)` once
- Provides container via React Context
- Enables `useInject()` without module parameter
- Handles React StrictMode safely

### 5. Use in Components

```typescript
import { useInject } from "@pixielity/container";
import { UserService } from "./user.service";

function UserList() {
  // No need to pass AppModule - gets from ContainerProvider context
  const userService = useInject(UserService);
  const users = userService.getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}
```

### Alternative: Manual Initialization (Node.js/Backend)

For non-React applications:

```typescript
import { Inversiland, getModuleContainer } from "@pixielity/container";
import { AppModule } from "./app.module";
import { UserService } from "./user.service";

// Configure and run the module system ONCE at startup
Inversiland.options.logLevel = "debug";
Inversiland.options.defaultScope = "Singleton";
Inversiland.run(AppModule);

// Get services from container
const container = getModuleContainer(AppModule);
const userService = container.get(UserService);
```

## Dynamic Modules

Create configurable modules with `forRoot` and `forFeature` patterns:

```typescript
import { Module, forRoot, type DynamicModule } from "@pixielity/container";

export const DATABASE_CONFIG = Symbol("DATABASE_CONFIG");

@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseConfig): DynamicModule {
    return forRoot(DatabaseModule, {
      providers: [
        {
          provide: DATABASE_CONFIG,
          useValue: config,
        },
        DatabaseService,
      ],
      exports: [DatabaseService],
    });
  }
}

// Usage
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: "localhost",
      port: 5432,
    }),
  ],
})
export class AppModule {}
```

## Provider Types

### Class Provider

```typescript
{
  provide: UserService,
  useClass: UserService,
}
```

### Value Provider

```typescript
{
  provide: API_KEY,
  useValue: "my-api-key",
}
```

### Factory Provider

```typescript
{
  provide: CONNECTION,
  useFactory: (context) => () => createConnection(),
}
```

### Async Factory Provider

```typescript
{
  provide: CONNECTION,
  useAsyncFactory: () => async () => {
    const connection = await createConnection();
    return connection;
  },
}
```

### Existing Provider (Alias)

```typescript
{
  provide: "USER_SERVICE_ALIAS",
  useExisting: UserService,
}
```

## Scopes

Control the lifecycle of your services:

```typescript
@Module({
  providers: [
    {
      provide: UserService,
      useClass: UserService,
      scope: "Singleton", // Default: shared across the app
    },
    {
      provide: RequestService,
      useClass: RequestService,
      scope: "Transient", // New instance every time
    },
  ],
})
export class AppModule {}
```

## API Reference

### Decorators

- `@Module(metadata)` - Define a module
- `@Injectable()` - Mark a class as injectable
- `@Inject(token)` - Inject a dependency
- `@MultiInject(token)` - Inject multiple dependencies with the same token
- `@Optional()` - Mark a dependency as optional
- `@InjectProvided(token)` - Inject only local providers (advanced)
- `@InjectImported(token)` - Inject only imported providers (advanced)
- `@MultiInjectProvided(token)` - Multi-inject only local providers (advanced)
- `@MultiInjectImported(token)` - Multi-inject only imported providers (advanced)

### React Hooks

- `useInject<T>(token, module?)` - Inject a service in a component (module optional with ContainerProvider)
- `useModule(module)` - Access the module container
- `useContainer()` - Get container from ContainerProvider context

### React Components

- `<ContainerProvider module={Module}>` - Initialize and provide container context (recommended for React apps)

### Utilities

- `forRoot(module, metadata)` - Create a root dynamic module
- `forFeature(module, metadata)` - Create a feature dynamic module
- `createModuleFactory(module, metadata)` - Generic module factory helper

## Important: Initialization

### The Two-Phase Lifecycle

1. **Decorator Phase (Import Time)**: `@Module()` creates empty containers and stores metadata
2. **Initialization Phase (Runtime)**: `Inversiland.run()` binds providers to containers

### React Apps: Use ContainerProvider

```typescript
<ContainerProvider module={AppModule}>
  <App />
</ContainerProvider>
```

The `ContainerProvider`:
- Calls `Inversiland.run()` automatically (once)
- Provides container via React Context
- Enables `useInject()` without module parameter

### Node.js/Backend: Call Inversiland.run()

```typescript
Inversiland.run(AppModule); // Call once at startup
```

### Common Mistake

❌ **Don't access services before initialization:**
```typescript
@Module({ providers: [UserService] })
class AppModule {}

const container = getModuleContainer(AppModule);
const service = container.get(UserService); // Error: No bindings found
```

✅ **Initialize first:**
```typescript
Inversiland.run(AppModule); // Initialize
const container = getModuleContainer(AppModule);
const service = container.get(UserService); // Works!
```

See [Container Setup Guide](../../.docs/CONTAINER_SETUP_GUIDE.md) for detailed patterns and troubleshooting.

## Learn More

- [Inversiland Documentation](https://github.com/inversiland/inversiland)
- [NestJS Modules](https://docs.nestjs.com/modules)
- [InversifyJS](https://inversify.io/)

## License

MIT
