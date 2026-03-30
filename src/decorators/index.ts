/**
 * Decorators for dependency injection
 *
 * @module decorators
 */

export { Module } from "./module.decorator";
export { Injectable } from "./injectable.decorator";
export { Inject } from "./inject.decorator";
export { MultiInject } from "./multi-inject.decorator";
export { Optional } from "./optional.decorator";
export { Global } from "./global.decorator";

// Advanced injection decorators for explicit provider scoping
export { InjectProvided } from "./inject-provided.decorator";
export { InjectImported } from "./inject-imported.decorator";
export { MultiInjectProvided } from "./multi-inject-provided.decorator";
export { MultiInjectImported } from "./multi-inject-imported.decorator";
