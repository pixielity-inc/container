/**
 * @pixielity/react
 *
 * React bindings for the `@abdokouta/ts-container` DI system.
 *
 * Provides:
 * - `<ContainerProvider>` — React component that provides the DI context
 * - `useContainer()` — access the raw ContainerResolver
 * - `useInject()` — resolve a provider in a component
 * - `useOptionalInject()` — resolve a provider or get undefined
 *
 * @example
 * ```tsx
 * import { ContainerProvider, useInject } from '@pixielity/react';
 * import { ApplicationContext } from '@pixielity/application';
 *
 * const app = await ApplicationContext.create(AppModule);
 *
 * function Root() {
 *   return (
 *     <ContainerProvider context={app}>
 *       <App />
 *     </ContainerProvider>
 *   );
 * }
 *
 * function UserProfile() {
 *   const userService = useInject(UserService);
 *   return <div>{userService.getUser('1').name}</div>;
 * }
 * ```
 *
 * @module @pixielity/react
 */

// ─────────────────────────────────────────────────────────────────────────────
// Contexts
// ─────────────────────────────────────────────────────────────────────────────
export { ContainerContext } from './contexts/container.context';

// ─────────────────────────────────────────────────────────────────────────────
// Providers (Components)
// ─────────────────────────────────────────────────────────────────────────────
export { ContainerProvider } from './providers/container.provider';

// ─────────────────────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────────────────────
export { useContainer } from './hooks/use-container.hook';
export { useInject } from './hooks/use-inject.hook';
export { useOptionalInject } from './hooks/use-optional-inject.hook';

// ─────────────────────────────────────────────────────────────────────────────
// Interfaces
// ─────────────────────────────────────────────────────────────────────────────
export type { ContainerProviderProps } from './interfaces/container-provider-props.interface';
