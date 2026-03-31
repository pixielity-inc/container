import { Module, interfaces } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { LifecycleService } from "@/services/lifecycle.service";
import { LOGGER_SERVICE, LIFECYCLE_SERVICE } from "@/constants";

/**
 * Module demonstrating lifecycle hooks
 * Uses onActivation and onDeactivation from Inversiland
 * to call OnModuleInit and OnModuleDestroy interface methods
 */
@Module({
  providers: [
    { provide: LOGGER_SERVICE, useClass: LoggerService },
    {
      provide: LIFECYCLE_SERVICE,
      useClass: LifecycleService,
      scope: "Singleton",
      onActivation: (_context: interfaces.Context, instance) => {
        // Called after instance is created, before it's returned
        // Calls OnModuleInit.onModuleInit() if implemented
        instance.onModuleInit();

        return instance;
      },
      onDeactivation: (instance) => {
        // Called when container is disposed
        // Calls OnModuleDestroy.onModuleDestroy() if implemented
        instance.onModuleDestroy();
      },
    },
  ],
  exports: [LIFECYCLE_SERVICE],
})
export class LifecycleModule {}
