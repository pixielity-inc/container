/**
 * Module Metadata Types
 *
 * @description
 * Type definitions for module configuration metadata.
 */

import type { DynamicModule, Provider, Newable } from "inversiland";
import type { ServiceIdentifier } from "@/types/provider.type";

/**
 * Exported provider configuration
 *
 * @description
 * Defines how a provider should be exported from a module.
 */
export interface DetailedExportedProvider<T = unknown> {
  /**
   * Service identifier to export
   */
  provide: ServiceIdentifier<T>;

  /**
   * Whether to export deeply (re-export from imported modules)
   */
  deep?: boolean;
}

/**
 * Exported provider type
 *
 * @description
 * Can be either a service identifier or a detailed export configuration.
 */
export type ExportedProvider<T = unknown> =
  | ServiceIdentifier<T>
  | DetailedExportedProvider<T>;

/**
 * Module metadata arguments
 *
 * @description
 * Configuration object for defining a module's dependencies and providers.
 */
export interface ModuleMetadata {
  /**
   * List of imported modules
   */
  imports?: (Newable | DynamicModule)[];

  /**
   * List of providers that will be instantiated by this module
   */
  providers?: Provider[];

  /**
   * List of providers to export (make available to importing modules)
   */
  exports?: ExportedProvider[];
}
