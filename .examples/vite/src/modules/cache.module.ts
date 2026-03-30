import { Module, forFeature, type DynamicModule } from "@abdokouta/react-di";
import { CacheService, CACHE_CONFIG, type CacheConfig } from "@/services/cache.service";
import { LoggerService } from "@/services/logger.service";

@Module({})
export class CacheModule {
  /**
   * Dynamic module pattern: forFeature
   * Used for feature-specific configuration that can be imported multiple times
   */
  static forFeature(config: CacheConfig): DynamicModule {
    return forFeature(CacheModule, {
      providers: [
        LoggerService,
        {
          provide: CACHE_CONFIG,
          useValue: config,
        },
        CacheService,
      ],
      exports: [CacheService],
    });
  }
}
