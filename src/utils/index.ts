/**
 * Utility functions for module creation
 *
 * @module utils
 */

export { createModuleFactory } from "./create-module-factory.util";
export { forRoot, forFeature } from "./module-helpers.util";
export { isGlobalModule, makeProvidersGlobal, applyGlobalIfNeeded } from "./global.util";
