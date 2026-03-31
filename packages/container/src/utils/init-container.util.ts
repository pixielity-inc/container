/**
 * Container Initialization Utility
 *
 * Provides a simple way to initialize the DI container before React renders.
 * This MUST be called in your entry point (main.tsx/index.tsx) BEFORE ReactDOM.createRoot().
 *
 * @module utils/init-container
 */

import { Inversiland } from "inversiland";
import type { Newable } from "inversiland";
import type { IContainerConfig } from "@/interfaces/container-config.interface";

/**
 * Options for initializing the container
 */
export interface InitContainerOptions {
  /**
   * The root module class to initialize
   */
  module: Newable;

  /**
   * Container configuration options
   */
  config?: Partial<IContainerConfig>;
}

/**
 * Default container configuration
 */
const defaultConfig: IContainerConfig = {
  logLevel: "info",
  defaultScope: "Singleton",
};

/**
 * Initialize the DI container
 *
 * This function MUST be called ONCE in your entry point (main.tsx/index.tsx)
 * BEFORE React renders. Calling it inside a React component will cause HMR issues.
 *
 * @param options - Initialization options including module and config
 *
 * @example
 * ```typescript
 * // main.tsx
 * import "reflect-metadata";
 * import { initContainer } from "@abdokouta/react-di";
 * import { AppModule } from "./modules/app.module";
 *
 * // Initialize BEFORE React renders
 * initContainer({
 *   module: AppModule,
 *   config: {
 *     logLevel: import.meta.env.DEV ? "debug" : "info",
 *     defaultScope: "Singleton",
 *   },
 * });
 *
 * // Then render React
 * ReactDOM.createRoot(document.getElementById("root")!).render(
 *   <ContainerProvider module={AppModule}>
 *     <App />
 *   </ContainerProvider>
 * );
 * ```
 */
export function initContainer(options: InitContainerOptions): void {
  const { module, config = {} } = options;
  const mergedConfig = { ...defaultConfig, ...config };

  // Configure Inversiland options
  if (mergedConfig.logLevel) {
    Inversiland.options.logLevel = mergedConfig.logLevel;
  }
  if (mergedConfig.defaultScope) {
    Inversiland.options.defaultScope = mergedConfig.defaultScope;
  }

  // Run Inversiland with the root module
  Inversiland.run(module);
}
