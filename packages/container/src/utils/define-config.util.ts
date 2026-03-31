/**
 * Define Config Utility
 *
 * Helper function to define container configuration with type safety.
 *
 * @module @abdokouta/react-di
 */

import type { IContainerConfig } from "../interfaces/container-config.interface";

/**
 * Helper function to define container configuration with type safety
 *
 * Provides IDE autocomplete and type checking for configuration objects.
 * This pattern is consistent with modern tooling (Vite, Vitest, etc.).
 *
 * @param config - The container configuration object
 * @returns The same configuration object with proper typing
 *
 * @example
 * ```typescript
 * // container.config.ts
 * import { defineConfig } from '@abdokouta/react-di';
 *
 * export default defineConfig({
 *   logLevel: 'debug',
 *   defaultScope: 'Singleton',
 * });
 * ```
 */
export function defineConfig(config: IContainerConfig): IContainerConfig {
  return config;
}
