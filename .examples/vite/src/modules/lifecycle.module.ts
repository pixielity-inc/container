import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { LifecycleService } from "@/services/lifecycle.service";

/**
 * Module demonstrating lifecycle hooks
 */
@Module({
  providers: [LoggerService, LifecycleService],
  exports: [LifecycleService],
})
export class LifecycleModule {}
