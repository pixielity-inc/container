/**
 * @fileoverview Module Options Interface
 * 
 * Defines the standard interface for module configuration options.
 * 
 * @module @pixielity/react-di
 * @category Types
 */
import type { Scope } from "./scope.type";
import type { LogLevel } from "./log-level.type";


/**
 * Base module options interface
 * 
 * Standard configuration options that all modules should support.
 * Extend this interface in your module-specific options.
 * 
 * @example
 * ```typescript
 * import { IModuleOptions } from '@pixielity/react-di';
 * 
 * export interface MyModuleOptions extends IModuleOptions {
 *   customOption: string;
 *   anotherOption?: number;
 * }
 * ```
 */
export interface IModuleOptions {
   /**
   * Log level for debugging
   * @default "info"
   */
  logLevel?: LogLevel;

  /**
   * Default scope for providers
   * @default "Singleton"
   */
  defaultScope?: Scope;
  
  /**
   * Whether the module should be global
   * 
   * When true, all providers in the module will be marked as global
   * and available across the entire application without explicit imports.
   * 
   * @default false
   */
  isGlobal?: boolean;

  /**
   * Modules to import
   * 
   * Array of modules that this module depends on.
   */
  imports?: any[];
}

/**
 * Async module options interface
 * 
 * Configuration options for modules that need async initialization.
 * 
 * @example
 * ```typescript
 * import { IModuleAsyncOptions } from '@pixielity/react-di';
 * 
 * export interface MyModuleAsyncOptions extends IModuleAsyncOptions<MyModuleOptions> {
 *   // Additional async-specific options
 * }
 * ```
 */
export interface IModuleAsyncOptions<T = any> {
  /**
   * Factory function to create module options
   * 
   * Can be synchronous or asynchronous.
   */
  useFactory?: (...args: any[]) => Promise<T> | T;

  /**
   * Dependencies to inject into the factory function
   */
  inject?: any[];

  /**
   * Modules to import
   */
  imports?: any[];

  /**
   * Whether the module should be global
   * 
   * @default false
   */
  isGlobal?: boolean;

   /**
   * Log level for debugging
   * @default "info"
   */
  logLevel?: LogLevel;

  /**
   * Default scope for providers
   * @default "Singleton"
   */
  defaultScope?: Scope;
}
