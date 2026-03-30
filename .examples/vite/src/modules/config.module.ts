import { Module, forRoot, type DynamicModule } from "@abdokouta/react-di";
import { ConfigService, type AppConfig } from "@/services/config.service";

export const CONFIG_OPTIONS = Symbol("CONFIG_OPTIONS");

@Module({})
export class ConfigModule {
  /**
   * Dynamic module pattern: forRoot
   * Used to configure a module with runtime options
   */
  static forRoot(config: AppConfig): DynamicModule {
    return forRoot(ConfigModule, {
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: config,
        },
        {
          provide: ConfigService,
          useFactory: (context) => () => {
            const options = context.container.get<AppConfig>(CONFIG_OPTIONS);
            return new ConfigService(options);
          },
        },
      ],
      exports: [ConfigService],
    });
  }
}
