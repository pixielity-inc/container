import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { TestableService } from "@/services/testable.service";
import { LOGGER_SERVICE, TESTABLE_SERVICE } from "@/constants";

/**
 * Module for testing patterns demonstration
 * Relies on AppModule to provide CacheService (no direct CacheModule import)
 * This avoids creating multiple CacheModule containers
 */
@Module({
  imports: [],
  providers: [
    { provide: LOGGER_SERVICE, useClass: LoggerService },
    { provide: TESTABLE_SERVICE, useClass: TestableService },
  ],
  exports: [TESTABLE_SERVICE],
})
export class TestingModule {}
