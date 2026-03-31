# Lifecycle Hooks in @abdokouta/react-di

## Overview

Lifecycle hooks in `@abdokouta/react-di` are provided by the underlying Inversiland/InversifyJS framework. These hooks allow you to execute code when a service instance is created or destroyed.

## Available Hooks

### onActivation

Called **after** an instance is created and **before** it's returned to the requester.

**Signature:**

```typescript
onActivation?: (context: interfaces.Context, injectable: T) => T
```

**Use Cases:**

- Initialize resources (database connections, file handles)
- Set up event listeners
- Perform post-construction setup
- Validate instance state
- Wrap instance with proxy

**Example:**

```typescript
@Module({
  providers: [
    {
      provide: DatabaseService,
      useClass: DatabaseService,
      onActivation: (context, instance) => {
        instance.connect(); // Initialize connection
        return instance;
      },
    },
  ],
})
export class AppModule {}
```

### onDeactivation

Called **before** an instance is destroyed (when container is disposed).

**Signature:**

```typescript
onDeactivation?: (injectable: T) => void
```

**Use Cases:**

- Close database connections
- Clean up file handles
- Remove event listeners
- Cancel pending operations
- Release resources

**Example:**

```typescript
@Module({
  providers: [
    {
      provide: DatabaseService,
      useClass: DatabaseService,
      onDeactivation: (instance) => {
        instance.disconnect(); // Clean up connection
      },
    },
  ],
})
export class AppModule {}
```

## Complete Example

```typescript
import { Injectable, Module, Inject } from "@abdokouta/react-di";

@Injectable()
class DatabaseService {
  private connection: any = null;
  private isConnected = false;

  constructor(@Inject(LoggerService) private logger: LoggerService) {
    this.logger.info("DatabaseService constructor called");
  }

  // Called by onActivation hook
  async connect(): Promise<void> {
    if (!this.isConnected) {
      this.logger.info("Connecting to database...");
      this.connection = await createConnection();
      this.isConnected = true;
      this.logger.info("Database connected");
    }
  }

  // Called by onDeactivation hook
  async disconnect(): Promise<void> {
    if (this.isConnected) {
      this.logger.info("Disconnecting from database...");
      await this.connection.close();
      this.isConnected = false;
      this.logger.info("Database disconnected");
    }
  }

  query(sql: string): any {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }
    return this.connection.query(sql);
  }
}

@Module({
  providers: [
    LoggerService,
    {
      provide: DatabaseService,
      useClass: DatabaseService,
      scope: "Singleton",
      onActivation: async (context, instance) => {
        await instance.connect();
        return instance;
      },
      onDeactivation: async (instance) => {
        await instance.disconnect();
      },
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
```

## Scopes and Lifecycle

Lifecycle hooks behave differently based on the provider scope:

### Singleton Scope

- `onActivation`: Called **once** when first requested
- `onDeactivation`: Called **once** when container is disposed
- Instance is shared across the entire application

```typescript
{
  provide: MyService,
  useClass: MyService,
  scope: "Singleton", // Default
  onActivation: (ctx, instance) => {
    console.log("Created once"); // Called once
    return instance;
  },
}
```

### Transient Scope

- `onActivation`: Called **every time** the service is injected
- `onDeactivation`: Called when container is disposed (for all instances)
- New instance created for each injection

```typescript
{
  provide: MyService,
  useClass: MyService,
  scope: "Transient",
  onActivation: (ctx, instance) => {
    console.log("Created every time"); // Called on each injection
    return instance;
  },
}
```

### Request Scope

- `onActivation`: Called **once per request**
- `onDeactivation`: Called at end of request
- Instance is shared within a single request

```typescript
{
  provide: MyService,
  useClass: MyService,
  scope: "Request",
  onActivation: (ctx, instance) => {
    console.log("Created per request"); // Called once per request
    return instance;
  },
}
```

## Best Practices

### 1. Keep Hooks Simple

```typescript
// ✅ Good - Simple initialization
onActivation: (ctx, instance) => {
  instance.initialize();
  return instance;
};

// ❌ Bad - Complex logic in hook
onActivation: (ctx, instance) => {
  // Too much logic here
  instance.connect();
  instance.loadConfig();
  instance.setupListeners();
  instance.validateState();
  return instance;
};
```

### 2. Handle Async Operations

```typescript
// ✅ Good - Async initialization
onActivation: async (ctx, instance) => {
  await instance.connect();
  return instance;
};

// ⚠️ Note: Async hooks are supported but may delay injection
```

### 3. Always Return Instance in onActivation

```typescript
// ✅ Good - Returns instance
onActivation: (ctx, instance) => {
  instance.initialize();
  return instance; // Required!
};

// ❌ Bad - Doesn't return instance
onActivation: (ctx, instance) => {
  instance.initialize();
  // Missing return!
};
```

### 4. Clean Up Resources in onDeactivation

```typescript
// ✅ Good - Proper cleanup
onDeactivation: (instance) => {
  instance.removeAllListeners();
  instance.closeConnections();
  instance.clearCache();
};

// ❌ Bad - No cleanup
onDeactivation: (instance) => {
  // Resources leak!
};
```

### 5. Use Constructor for Simple Setup

```typescript
// ✅ Good - Simple setup in constructor
@Injectable()
class MyService {
  constructor() {
    this.id = generateId(); // Simple initialization
  }
}

// ⚠️ Use onActivation only for complex/async setup
{
  provide: MyService,
  useClass: MyService,
  onActivation: async (ctx, instance) => {
    await instance.loadConfig(); // Complex/async initialization
    return instance;
  },
}
```

## React Integration

When using lifecycle hooks with React, be aware of the component lifecycle:

```typescript
import { useInject } from "@abdokouta/react-di";
import { useEffect } from "react";

function MyComponent() {
  const service = useInject(MyService);

  useEffect(() => {
    // Service is already initialized by onActivation
    // You can use it immediately
    service.doWork();

    // Component cleanup (not service cleanup)
    return () => {
      // Don't call service.cleanup() here
      // onDeactivation handles that
    };
  }, [service]);

  return <div>{service.getData()}</div>;
}
```

## Comparison with Other Frameworks

### NestJS

```typescript
// NestJS
@Injectable()
class MyService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() { /* init */ }
  onModuleDestroy() { /* cleanup */ }
}

// @abdokouta/react-di (via Inversiland)
{
  provide: MyService,
  useClass: MyService,
  onActivation: (ctx, instance) => { /* init */ return instance; },
  onDeactivation: (instance) => { /* cleanup */ },
}
```

### Angular

```typescript
// Angular
@Injectable()
class MyService implements OnInit, OnDestroy {
  ngOnInit() {
    /* init */
  }
  ngOnDestroy() {
    /* cleanup */
  }
}

// @abdokouta/react-di (via Inversiland)
// Same as NestJS example above
```

## Limitations

1. **No OnInit Interface**: Unlike NestJS, there's no interface to implement. Hooks are configured in the module.

2. **Container-Level Only**: Hooks are tied to the DI container, not component lifecycle.

3. **Async Considerations**: Async hooks may delay injection. Consider lazy initialization for heavy operations.

4. **No Built-in Request Scope**: Request scope requires manual implementation in web frameworks.

## Summary

- ✅ Inversiland provides `onActivation` and `onDeactivation` hooks
- ✅ Hooks are configured in module providers, not in service classes
- ✅ `onActivation` is for initialization, `onDeactivation` is for cleanup
- ✅ Hooks work with all scopes (Singleton, Transient, Request)
- ✅ Always return the instance from `onActivation`
- ✅ Use hooks for resource management, not business logic

---

**See Also:**

- [Inversiland Documentation](https://github.com/carlossalasamper/inversiland)
- [InversifyJS Lifecycle](https://github.com/inversify/InversifyJS/blob/master/wiki/activation_handler.md)
