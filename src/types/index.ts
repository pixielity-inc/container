/**
 * Type definitions
 *
 * @module types
 */

// Re-export Inversiland types
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
} from "./inversiland.type";

// Export custom types
export type { Scope } from "./scope.type";
export type { LogLevel } from "./log-level.type";
export type { IModuleOptions, IModuleAsyncOptions } from "./module-options.interface";
