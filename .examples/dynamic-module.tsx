/**
 * Dynamic Module Example
 *
 * This example demonstrates how to create configurable modules
 * using the forRoot pattern
 */

import React from "react";
import {
  Module,
  Injectable,
  Inject,
  forRoot,
  useInject,
  type DynamicModule,
} from "@pixielity/container";

// 1. Define configuration token
export const DATABASE_CONFIG = Symbol("DATABASE_CONFIG");

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
}

// 2. Create service that uses configuration
@Injectable()
class DatabaseService {
  constructor(@Inject(DATABASE_CONFIG) private config: DatabaseConfig) {}

  connect() {
    console.log(`Connecting to ${this.config.host}:${this.config.port}/${this.config.database}`);
    return `Connected to ${this.config.database}`;
  }
}

// 3. Create dynamic module
@Module({})
class DatabaseModule {
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

// 4. Use in root module
@Module({
  imports: [
    DatabaseModule.forRoot({
      host: "localhost",
      port: 5432,
      database: "myapp",
    }),
  ],
})
class AppModule {}

// 5. Initialize and use in components
import { Inversiland } from "@pixielity/container";

// Initialize Inversiland
Inversiland.options.logLevel = "debug";
Inversiland.options.defaultScope = "Singleton";
Inversiland.run(AppModule);

function DatabaseStatus() {
  const dbService = useInject(DatabaseService, AppModule);
  const status = dbService.connect();

  return <div>Database Status: {status}</div>;
}

export function App() {
  return <DatabaseStatus />;
}
