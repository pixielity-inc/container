import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { CounterService } from "@/services/counter.service";
import { UserService } from "@/services/user.service";
import { ConfigModule } from "./config.module";
import { ApiModule } from "./api.module";
import { CacheModule } from "./cache.module";
import { TestingModule } from "./testing.module";
import { LifecycleModule } from "./lifecycle.module";
import { ScopeModule } from "./scope.module";
import { LOGGER_SERVICE, COUNTER_SERVICE, USER_SERVICE, CACHE_SERVICE } from "@/constants";

@Module({
  imports: [
    // Dynamic module with forRoot - configuration at root level
    ConfigModule.forRoot({
      apiUrl: "https://api.example.com",
      timeout: 5000,
      retries: 3,
      environment: "development",
    }),
    // Async factory pattern - connection established asynchronously
    ApiModule.forRoot({
      baseUrl: "https://api.example.com",
      timeout: 3000,
    }),
    // Feature module with forFeature - can be imported multiple times with different configs
    CacheModule.forFeature({
      maxSize: 100,
      ttl: 60000, // 1 minute
    }),
    // Testing patterns module
    TestingModule,
    // Lifecycle hooks module
    LifecycleModule,
    // Scope management module
    ScopeModule,
  ],
  providers: [
    { provide: LOGGER_SERVICE, useClass: LoggerService },
    { provide: COUNTER_SERVICE, useClass: CounterService },
    { provide: USER_SERVICE, useClass: UserService },
  ],
  exports: [
    LOGGER_SERVICE,
    COUNTER_SERVICE,
    USER_SERVICE,
    // Export CACHE_SERVICE so child modules like TestingModule can access it
    CACHE_SERVICE,
  ],
})
export class AppModule {}
