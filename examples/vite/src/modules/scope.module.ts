import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { RequestService } from "@/services/request.service";
import { TransientService } from "@/services/transient.service";
import { LOGGER_SERVICE, REQUEST_SERVICE, TRANSIENT_SERVICE } from "@/constants";

/**
 * Module demonstrating different service scopes
 */
@Module({
  providers: [
    { provide: LOGGER_SERVICE, useClass: LoggerService }, // Singleton by default
    {
      provide: REQUEST_SERVICE,
      useClass: RequestService,
      scope: "Transient", // New instance per injection (simulating request scope)
    },
    {
      provide: TRANSIENT_SERVICE,
      useClass: TransientService,
      scope: "Transient", // New instance every time
    },
  ],
  exports: [LOGGER_SERVICE, REQUEST_SERVICE, TRANSIENT_SERVICE],
})
export class ScopeModule {}
