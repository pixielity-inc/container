import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { TestableService } from "@/services/testable.service";
import { CacheModule } from "./cache.module";

/**
 * Module for testing patterns demonstration
 */
@Module({
  imports: [
    CacheModule.forFeature({
      maxSize: 50,
      ttl: 30000, // 30 seconds
    }),
  ],
  providers: [LoggerService, TestableService],
  exports: [TestableService],
})
export class TestingModule {}
