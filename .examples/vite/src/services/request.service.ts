import { Injectable, Inject } from "@abdokouta/react-di";
import { LoggerService } from "./logger.service";

/**
 * Request-scoped service example
 * Each request gets its own instance
 */
@Injectable()
export class RequestService {
  private requestId: string;
  private startTime: number;

  constructor(@Inject(LoggerService) private logger: LoggerService) {
    this.requestId = Math.random().toString(36).substring(7);
    this.startTime = Date.now();
    this.logger.info(`RequestService created with ID: ${this.requestId}`);
  }

  getRequestId(): string {
    return this.requestId;
  }

  getElapsedTime(): number {
    return Date.now() - this.startTime;
  }

  processRequest(data: string): string {
    this.logger.log(`Processing request ${this.requestId}: ${data}`);
    return `Processed by ${this.requestId}: ${data}`;
  }
}
