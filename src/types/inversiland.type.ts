/**
 * Re-exported types from Inversiland
 *
 * @description
 * Core types from the Inversiland dependency injection framework.
 */

export type { DynamicModule, Newable, ModuleContainer } from "inversiland";

export type { ModuleMetadata } from "./module-metadata.type";
export type {
  Provider,
  ServiceIdentifier,
  ClassProvider,
  ValueProvider,
  FactoryProvider,
  AsyncFactoryProvider,
  ExistingProvider,
} from "./provider.type";
