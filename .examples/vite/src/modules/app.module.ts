import { Module } from "@abdokouta/react-di";
import { LoggerService } from "@/services/logger.service";
import { CounterService } from "@/services/counter.service";
import { UserService } from "@/services/user.service";

@Module({
  providers: [LoggerService, CounterService, UserService],
  exports: [LoggerService, CounterService, UserService],
})
export class AppModule {}
