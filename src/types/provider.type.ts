/**
 * Provider Types
 *
 * @description
 * Type definitions for dependency injection providers.
 * These types define how services can be registered in the container.
 */

import type { Newable } from "inversiland";

/**
 * Service identifier type
 *
 * @description
 * A service identifier can be a class constructor, string, or symbol.
 */
export type ServiceIdentifier<T = unknown> = string | symbol | Newable<T>;

/**
 * Shorthand to define a Class provider to self in singleton scope
 */
export type NewableProvider<T = unknown> = Newable<T>;

/**
 * Class provider configuration
 *
 * @description
 * Defines a provider that uses a class constructor.
 */
export interface ClassProvider<T = unknown> {
  /**
   * Service identifier (optional - defaults to the class itself)
   */
  provide?: ServiceIdentifier<T>;

  /**
   * Class to instantiate
   */
  useClass: Newable<T>;

  /**
   * Binding scope
   * @default "Transient"
   */
  scope?: "Singleton" | "Transient" | "Request";

  /**
   * Whether this provider is global
   */
  isGlobal?: boolean;
}

/**
 * Value provider configuration
 *
 * @description
 * Defines a provider that uses a static value.
 */
export interface ValueProvider<T = unknown> {
  /**
   * Service identifier
   */
  provide: ServiceIdentifier<T>;

  /**
   * Value to provide
   */
  useValue: T;

  /**
   * Whether this provider is global
   */
  isGlobal?: boolean;
}

/**
 * Factory provider configuration
 *
 * @description
 * Defines a provider that uses a factory function.
 */
export interface FactoryProvider<T = unknown> {
  /**
   * Service identifier
   */
  provide: ServiceIdentifier<T>;

  /**
   * Factory function
   */
  useFactory: () => T;

  /**
   * Whether this provider is global
   */
  isGlobal?: boolean;
}

/**
 * Async factory provider configuration
 *
 * @description
 * Defines a provider that uses an async factory function.
 */
export interface AsyncFactoryProvider<T = unknown> {
  /**
   * Service identifier
   */
  provide: ServiceIdentifier<T>;

  /**
   * Async factory function
   */
  useAsyncFactory: () => Promise<T>;

  /**
   * Whether this provider is global
   */
  isGlobal?: boolean;
}

/**
 * Existing provider configuration
 *
 * @description
 * Defines a provider that aliases an existing service.
 */
export interface ExistingProvider<T = unknown> {
  /**
   * Service identifier
   */
  provide: ServiceIdentifier<T>;

  /**
   * Existing service identifier to alias
   */
  useExisting: ServiceIdentifier<T>;

  /**
   * Whether this provider is global
   */
  isGlobal?: boolean;
}

/**
 * Provider type
 *
 * @description
 * Union type of all possible provider configurations.
 */
export type Provider<T = unknown> =
  | NewableProvider<T>
  | ClassProvider<T>
  | ValueProvider<T>
  | FactoryProvider<T>
  | AsyncFactoryProvider<T>
  | ExistingProvider<T>;
