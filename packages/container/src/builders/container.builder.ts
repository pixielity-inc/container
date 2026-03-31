/**
 * Container Builder
 *
 * Fluent builder pattern for configuring and initializing the DI container.
 * This MUST be called in your entry point (main.tsx/index.tsx) BEFORE ReactDOM.createRoot().
 *
 * @module builders/container
 */

import { Inversiland } from "inversiland";
import type { Newable } from "inversiland";
import type { IContainerConfig } from "@/interfaces/container-config.interface";
import type { LogLevel, Scope } from "@/types";

/**
 * Container Builder
 *
 * Provides a fluent API for configuring and initializing the DI container.
 *
 * @example
 * ```typescript
 * // main.tsx
 * import "reflect-metadata";
 * import { Container } from "@abdokouta/react-di";
 * import { AppModule } from "./modules/app.module";
 *
 * Container
 *   .configure()
 *   .withModule(AppModule)
 *   .withLogLevel("debug")
 *   .withDefaultScope("Singleton")
 *   .build();
 *
 * // Then render React
 * ReactDOM.createRoot(document.getElementById("root")!).render(
 *   <ContainerProvider module={AppModule}>
 *     <App />
 *   </ContainerProvider>
 * );
 * ```
 *
 * @example
 * ```typescript
 * // With defaults (logLevel: "info", defaultScope: "Singleton")
 * Container
 *   .configure()
 *   .withModule(AppModule)
 *   .withDefaults()
 *   .build();
 * ```
 *
 * @example
 * ```typescript
 * // Development vs Production
 * Container
 *   .configure()
 *   .withModule(AppModule)
 *   .withLogLevel(import.meta.env.DEV ? "debug" : "none")
 *   .withDefaultScope("Singleton")
 *   .build();
 * ```
 */
class ContainerBuilder {
  private _module: Newable | null = null;
  private _config: Partial<IContainerConfig> = {};

  /**
   * Set the root module for the container
   *
   * @param module - The root module class decorated with @Module()
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure().withModule(AppModule)
   * ```
   */
  withModule(module: Newable): this {
    this._module = module;
    return this;
  }

  /**
   * Set the log level for container operations
   *
   * @param level - The log level: "none" | "info" | "debug"
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure()
   *   .withModule(AppModule)
   *   .withLogLevel("debug")
   * ```
   */
  withLogLevel(level: LogLevel): this {
    this._config.logLevel = level;
    return this;
  }

  /**
   * Set the default scope for providers
   *
   * @param scope - The default scope: "Singleton" | "Transient" | "Request"
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure()
   *   .withModule(AppModule)
   *   .withDefaultScope("Singleton")
   * ```
   */
  withDefaultScope(scope: Scope): this {
    this._config.defaultScope = scope;
    return this;
  }

  /**
   * Apply the full configuration object
   *
   * @param config - The container configuration
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure()
   *   .withModule(AppModule)
   *   .withConfig({ logLevel: "debug", defaultScope: "Singleton" })
   * ```
   */
  withConfig(config: Partial<IContainerConfig>): this {
    this._config = { ...this._config, ...config };
    return this;
  }

  /**
   * Apply default configuration (logLevel: "info", defaultScope: "Singleton")
   *
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure()
   *   .withModule(AppModule)
   *   .withDefaults()
   *   .build();
   * ```
   */
  withDefaults(): this {
    this._config = {
      logLevel: "info",
      defaultScope: "Singleton",
    };
    return this;
  }

  /**
   * Apply development defaults (logLevel: "debug", defaultScope: "Singleton")
   *
   * @returns The builder instance for chaining
   *
   * @example
   * ```typescript
   * Container.configure()
   *   .withModule(AppModule)
   *   .withDevDefaults()
   *   .build();
   * ```
   */
  withDevDefaults(): this {
    this._config = {
      logLevel: "debug",
      defaultScope: "Singleton",
    };
    return this;
  }

  /**
   * Build and initialize the container
   *
   * This method MUST be called ONCE in your entry point (main.tsx/index.tsx)
   * BEFORE React renders. Calling it inside a React component will cause HMR issues.
   *
   * @throws Error if no module has been configured
   *
   * @example
   * ```typescript
   * Container
   *   .configure()
   *   .withModule(AppModule)
   *   .withDefaults()
   *   .build();
   * ```
   */
  build(): void {
    if (!this._module) {
      throw new Error(
        "[Container] No module configured. Call .withModule(YourModule) before .build()"
      );
    }

    // Apply configuration to Inversiland
    if (this._config.logLevel) {
      Inversiland.options.logLevel = this._config.logLevel;
    }
    if (this._config.defaultScope) {
      Inversiland.options.defaultScope = this._config.defaultScope;
    }

    // Initialize the container
    Inversiland.run(this._module);
  }
}

/**
 * Container
 *
 * Static class providing a fluent API for configuring and initializing the DI container.
 *
 * @example
 * ```typescript
 * import { Container } from "@abdokouta/react-di";
 *
 * Container
 *   .configure()
 *   .withModule(AppModule)
 *   .withLogLevel("debug")
 *   .withDefaultScope("Singleton")
 *   .build();
 * ```
 */
export class Container {
  /**
   * Start configuring the container
   *
   * @returns A new ContainerBuilder instance
   *
   * @example
   * ```typescript
   * Container.configure().withModule(AppModule).build();
   * ```
   */
  static configure(): ContainerBuilder {
    return new ContainerBuilder();
  }
}
