import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { RequestService } from "@/services/request.service";
import { TransientService } from "@/services/transient.service";

/**
 * Module demonstrating different service scopes
 */
@Module({
  providers: [
    LoggerService, // Singleton by default
    {
      provide: RequestService,
      useClass: RequestService,
      scope: "Transient", // New instance per injection (simulating request scope)
    },
    {
      provide: TransientService,
      useClass: TransientService,
      scope: "Transient", // New instance every time
    },
  ],
  exports: [LoggerService, RequestService, TransientService],
})
export class ScopeModule {}
