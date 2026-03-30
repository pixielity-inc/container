import { Injectable, Inject } from '@abdokouta/react-di';
import { LoggerService } from './logger.service';

/**
 * Service with lifecycle hooks demonstration
 * Shows initialization and cleanup patterns
 */
@Injectable()
export class LifecycleService {
  private isInitialized = false;
  private resources: string[] = [];
  private cleanupCallbacks: Array<() => void> = [];

  constructor(@Inject(LoggerService) private logger: LoggerService) {
    this.logger.info('LifecycleService constructor called');
  }

  /**
   * Initialization hook - called after construction
   * Use for async setup, resource allocation, etc.
   */
  async onInit(): Promise<void> {
    this.logger.info('LifecycleService.onInit() - Initializing resources...');

    // Simulate async initialization
    await new Promise((resolve) => setTimeout(resolve, 100));

    this.resources.push('Database Connection');
    this.resources.push('Cache Connection');
    this.resources.push('Message Queue');

    this.isInitialized = true;
    this.logger.info('LifecycleService.onInit() - Initialization complete');
  }

  /**
   * Cleanup hook - called before service destruction
   * Use for cleanup, closing connections, etc.
   */
  onDestroy(): void {
    this.logger.info('LifecycleService.onDestroy() - Cleaning up resources...');

    // Clean up resources
    this.resources.forEach((resource) => {
      this.logger.log(`Releasing: ${resource}`);
    });

    // Call cleanup callbacks
    this.cleanupCallbacks.forEach((callback) => callback());

    this.resources = [];
    this.isInitialized = false;
    this.logger.info('LifecycleService.onDestroy() - Cleanup complete');
  }

  getStatus(): { initialized: boolean; resources: string[] } {
    return {
      initialized: this.isInitialized,
      resources: [...this.resources],
    };
  }

  registerCleanup(callback: () => void): void {
    this.cleanupCallbacks.push(callback);
  }
}
