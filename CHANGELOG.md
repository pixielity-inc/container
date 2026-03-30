# @pixielity/react-di

## 1.0.0 (Initial Release)

### Features

- ✨ NestJS-style module system for React
- 💉 Powerful dependency injection with decorators
- 🔄 Dynamic modules with `forRoot` and `forFeature` patterns
- ⚛️ React hooks (`useInject`, `useModule`)
- 📦 Hierarchical module structure
- 🎨 Full TypeScript support
- 🏗️ Built on Inversiland and InversifyJS

### Decorators

#### Core Decorators
- `@Module` - Define modules with imports, providers, and exports
- `@Injectable` - Mark classes as injectable
- `@Inject` - Inject dependencies (recommended default)
- `@MultiInject` - Inject multiple dependencies with same identifier
- `@Optional` - Mark dependencies as optional

#### Advanced Injection Decorators
- `@InjectProvided` - Inject only local providers (excludes imports)
- `@InjectImported` - Inject only imported providers (excludes local)
- `@MultiInjectProvided` - Multi-inject only local providers
- `@MultiInjectImported` - Multi-inject only imported providers

### React Hooks

- `useInject(token, module)` - Hook to inject services in components
- `useModule(module)` - Hook to access module container directly

### Utilities

- `forRoot(module, metadata)` - Create root-level dynamic modules
- `forFeature(module, metadata)` - Create feature-level dynamic modules
- `createModuleFactory(module, metadata)` - Generic module factory helper

### Type Definitions

- `ModuleMetadata` - Module configuration interface
- `DynamicModule` - Dynamic module return type
- `Provider` - Union of all provider types
- `ClassProvider` - Class-based provider
- `ValueProvider` - Value-based provider
- `FactoryProvider` - Factory function provider
- `AsyncFactoryProvider` - Async factory provider
- `ExistingProvider` - Alias provider
- `ServiceIdentifier` - Service token type
- `Scope` - Provider lifecycle scope
- `LogLevel` - Logging verbosity level

### Dependencies

- `inversiland` ^0.6.2 - Core DI framework
- `reflect-metadata` ^0.2.0 - Metadata reflection support

### Peer Dependencies

- `react` ^18.0.0 - React framework

