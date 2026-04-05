/**
 * @fileoverview React context for the DI container.
 *
 * Holds a `ContainerResolver` reference that React hooks use to
 * resolve providers. The resolver is provided by `<ContainerProvider>`.
 *
 * @module contexts/context
 */

import { createContext } from 'react';
import type { ContainerResolver } from '@abdokouta/ts-container';

/**
 * React context that holds the container resolver.
 *
 * `null` by default — must be provided by `ContainerProvider`.
 * Using `useInject()` outside of a `ContainerProvider` will throw.
 */
export const ContainerContext = createContext<ContainerResolver | null>(null);

ContainerContext.displayName = 'ContainerContext';
