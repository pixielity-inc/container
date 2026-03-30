/**
 * @pixielity/container
 *
 * Dependency injection container for React with NestJS-style modules.
 * Built on top of Inversiland for powerful, type-safe dependency injection
 * with decorators, React hooks, and module-based architecture.
 *
 * @example
 * Basic module and service setup:
 * ```typescript
 * import { Module, Injectable, Inject } from '@pixielity/container';
 * import 'reflect-metadata';
 *
 * @Injectable()
 * class LoggerService {
 *   log(message: string) {
 *     console.log(message);
 *   }
 * }
 *
 * @Injectable()
 * class UserService {
 *   constructor(@Inject(LoggerService) private logger: LoggerService) {}
 *
 *   getUser(id: string) {
 *     this.logger.log(`Fetching user ${id}`);
 *     return { id, name: 'John Doe' };
 *   }
 * }
 *
 * @Module({
 *   providers: [LoggerService, UserService],
 * })
 * export class AppModule {}
 * ```
 *
 * @example
 * Using in React components:
 * ```typescript
 * import { ModuleProvider, useInject } from '@pixielity/container';
 * import { AppModule } from './app.module';
 *
 * function App() {
 *   return (
 *     <ModuleProvider module={AppModule}>
 *       <UserComponent />
 *     </ModuleProvider>
 *   );
 * }
 *
 * function UserComponent() {
 *   const userService = useInject(UserService);
 *   const user = userService.getUser('123');
 *   return <div>{user.name}</div>;
 * }
 * ```
 *
 * @example
 * Factory providers:
 * ```typescript
 * @Module({
 *   providers: [
 *     {
 *       provide: ConfigService,
 *       useFactory: () => new ConfigService({ apiUrl: 'https://api.example.com' }),
 *     },
 *   ],
 * })
 * export class AppModule {}
 * ```
 *
 * @module @pixielity/container
 */

import "reflect-metadata";

// ============================================================================
// Decorators
// ============================================================================
export {
  Module,
  Global,
  Injectable,
  Inject,
  MultiInject,
  Optional,
  InjectProvided,
  InjectImported,
  MultiInjectProvided,
  MultiInjectImported,
} from "./decorators";

// ============================================================================
// Types
// ============================================================================
export type {
  ModuleMetadata,
  DynamicModule,
  Provider,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  AsyncFactoryProvider,
  ExistingProvider,
  ServiceIdentifier,
  Newable,
  ModuleContainer,
  Scope,
  LogLevel,
  IModuleOptions,
  IModuleAsyncOptions,
} from "./types";

// ============================================================================
// React Hooks
// ============================================================================
export { useInject, useModule } from "./hooks";

// ============================================================================
// React Context & Provider
// ============================================================================
export { ContainerProvider } from "./providers/container.provider";
export type { ContainerProviderProps } from "./providers/container.provider";

// ============================================================================
// Utilities
// ============================================================================
export { createModuleFactory, forRoot, forFeature } from "./utils";

// ============================================================================
// Constants
// ============================================================================
export { METADATA_KEYS, DEFAULTS } from "./constants";

// ============================================================================
// Inversiland Core (Advanced Usage)
// ============================================================================
export { Inversiland, getModuleContainer } from "inversiland";
