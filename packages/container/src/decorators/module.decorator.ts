import { module } from "inversiland";
import type { Newable } from "inversiland";

import type { ModuleMetadataArg } from "@/types";

/**
 * Module Decorator
 *
 * @description
 * Defines a module in the dependency injection system.
 * A module is a class that organizes related providers and their dependencies.
 *
 * If the class is decorated with @Global(), all providers will automatically
 * be marked as global (isGlobal: true). Note: @Global() runs AFTER @Module
 * due to TypeScript decorator execution order (bottom-to-top), so @Global()
 * reads and modifies the metadata set by @Module.
 *
 * @param metadata - Module configuration
 * @param metadata.imports - Modules to import
 * @param metadata.providers - Services to provide
 * @param metadata.exports - Services to export to other modules
 *
 * @example
 * ```typescript
 * import { Module } from "@abdokouta/react-di";
 *
 * @Module({
 *   imports: [CommonModule],
 *   providers: [UserService, Logger],
 *   exports: [UserService]
 * })
 * export class UserModule {}
 * ```
 *
 * @example With @Global() decorator
 * ```typescript
 * import { Module, Global } from "@abdokouta/react-di";
 *
 * @Global()
 * @Module({
 *   providers: [LoggerService],
 *   exports: [LoggerService]
 * })
 * export class LoggerModule {}
 * // LoggerService is now available globally without explicit imports
 * ```
 *
 * @public
 */
export const Module = (metadata: ModuleMetadataArg = {}): ClassDecorator => {
  return function <T extends Function>(target: T): T | void {
    // Apply the inversiland module decorator
    // Note: If @Global() is also applied, it will run AFTER this and modify the metadata
    return module(metadata)(target as unknown as Newable);
  };
};
