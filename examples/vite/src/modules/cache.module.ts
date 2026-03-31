import { Module, forFeature, type DynamicModule } from "@abdokouta/react-di";
import { CacheService, type CacheConfig } from "@/services/cache.service";
import { LoggerService } from "@/services/logger.service";
import { CACHE_SERVICE, CACHE_CONFIG, LOGGER_SERVICE } from "@/constants";

@Module({})
export class CacheModule {
  /**
   * Dynamic module pattern: forFeature
   * Used for feature-specific configuration that can be imported multiple times
   */
  static forFeature(config: CacheConfig): DynamicModule {
    return forFeature(CacheModule, {
      providers: [
        { provide: LOGGER_SERVICE, useClass: LoggerService },
        {
          provide: CACHE_CONFIG,
          useValue: config,
        },
        { provide: CACHE_SERVICE, useClass: CacheService },
      ],
      exports: [CACHE_SERVICE],
    });
  }
}
